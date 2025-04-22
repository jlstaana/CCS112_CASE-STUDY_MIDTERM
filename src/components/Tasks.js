import React, { useState, useEffect } from "react";
import axios from "axios";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [status, setStatus] = useState("Pending");
    const [priority, setPriority] = useState("Low");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        try {
            const response = await axios.post("/api/tasks", {
                name: newTask,
                status,
                priority,
            });
            setTasks([...tasks, response.data]);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (id, updatedStatus) => {
        try {
            const response = await axios.put(`/api/tasks/${id}`, { status: updatedStatus });
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Tasks</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="New Task Name"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <select className="form-select mt-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select className="form-select mt-2" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button className="btn btn-primary mt-2" onClick={addTask}>
                    Add Task
                </button>
            </div>
            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{task.name}</strong> - {task.status} ({task.priority})
                        </div>
                        <div>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => updateTask(task.id, "Completed")}
                            >
                                Mark as Completed
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;