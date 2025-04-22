import React from "react";

function Tasks({ tasks = [] }) {
    return (
        <ul className="list-group">
            {tasks.length > 0 ? (
                tasks.map((task, i) => (
                    <li key={i} className="list-group-item">{task}</li>
                ))
            ) : (
                <li className="list-group-item text-center">No tasks available</li>
            )}
        </ul>
    );
}

export default Tasks;
