import React, { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");

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
            const response = await axios.post("/api/projects", { name: newProject });
            setProjects([...projects, response.data]);
            setNewProject("");
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
                <button className="btn btn-primary mt-2" onClick={addProject}>
                    Add Project
                </button>
            </div>
            <ul className="list-group">
                {projects.map((project) => (
                    <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {project.name}
                        <button className="btn btn-danger btn-sm" onClick={() => deleteProject(project.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;