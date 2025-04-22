import React from "react";

function Projects({ projects, onProjectClick }) {
    return (
        <table className="table table-bordered">
            <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Project Name</th>
                </tr>
            </thead>
            <tbody>
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <tr key={project.id} onClick={() => onProjectClick(project)} style={{ cursor: "pointer" }}>
                            <td>{index + 1}</td>
                            <td>{project.title}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2" className="text-center">No projects available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Projects;
