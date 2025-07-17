import React from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: <strong>{task.status}</strong></p>
          <Link to={`/tasks/${task._id}`} className="text-blue-600 underline">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default TaskList