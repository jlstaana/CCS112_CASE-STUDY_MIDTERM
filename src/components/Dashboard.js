import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Projects from "./Projects";
import Tasks from "./Tasks";
import logo from "../assets/klick logo.png";

function Dashboard() {
    const [message, setMessage] = useState("");
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null); // Track selected project
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        } else {
            axios
                .get("http://127.0.0.1:8000/api/dashboard", { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setMessage(response.data.message);
                    setProjects(response.data.projects || []);
                })
                .catch(() => navigate("/"));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Function to fetch tasks for a selected project
    const handleProjectClick = (project) => {
        if (selectedProject === project.id) {
            // If the same project is clicked again, hide tasks
            setSelectedProject(null);
            setTasks([]);
        } else {
            axios
                .get(`http://127.0.0.1:8000/api/projects/${project.id}/tasks`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
                .then((response) => {
                    setSelectedProject(project.id);
                    setTasks(response.data.tasks || []);
                })
                .catch(() => setTasks([]));
        }
    };

    return (
        <div className="container mt-5">
            <img src={logo} alt="Logo" className="mb-3" style={{ width: "auto", height: "100px" }} />
            
            <h2 className="text-center">Dashboard</h2>
            <p className="text-muted text-center">{message}</p>

            <div className="d-flex justify-content-end">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            {/* Projects List */}
            <div className="card mt-3 p-3 shadow-sm">
                <h4>Projects</h4>
                <Projects projects={projects} onProjectClick={handleProjectClick} />
            </div>

            {/* Show Tasks Only When a Project is Selected */}
            {selectedProject && (
                <div className="card mt-3 p-3 shadow-sm">
                    <h4>  Tasks for {projects?.find(p => p.id === selectedProject)?.title || "Unknown Project"}</h4>
                    <Tasks tasks={tasks} />
                </div>
            )}
        </div>
    );
}

export default Dashboard;
