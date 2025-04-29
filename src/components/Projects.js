import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");
    const [newBudget, setNewBudget] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("/api/projects");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const addProject = async () => {
        try {
            const response = await axios.post("/api/projects", { name: newProject, budget: newBudget });
            setProjects([...projects, response.data]);
            setNewProject("");
            setNewBudget("");
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const deleteProject = async (id) => {
        try {
            await axios.delete(`/api/projects/${id}`);
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const ganttData = [
        [
            { type: "string", label: "Task ID" },
            { type: "string", label: "Task Name" },
            { type: "string", label: "Resource" },
            { type: "date", label: "Start Date" },
            { type: "date", label: "End Date" },
            { type: "number", label: "Duration" },
            { type: "number", label: "Percent Complete" },
            { type: "string", label: "Dependencies" },
        ],
        ...projects.map((project) => [
            project.id.toString(),
            project.name,
            null,
            new Date(project.startDate || Date.now()),
            new Date(project.endDate || Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week
            null,
            project.percentComplete || 0,
            null,
        ]),
    ];

    return (
        <div className="container mt-5">
            <h2>Projects</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="New Project Name"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                />
                <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Budget"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={addProject}>
                    Add Project
                </button>
            </div>
            <ul className="list-group">
                {projects.map((project) => (
                    <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{project.name}</strong> - Budget: ${project.budget || "N/A"}
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteProject(project.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <h3 className="mt-5">Gantt Chart</h3>
            <Chart
                chartType="Gantt"
                width="100%"
                height="400px"
                data={ganttData}
                options={{
                    gantt: {
                        trackHeight: 30,
                    },
                }}
            />
        </div>
    );
};

export default Projects;