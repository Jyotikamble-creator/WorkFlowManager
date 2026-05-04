import React from 'react';
import { Link } from 'react-router-dom';

// TaskList display the lists
const TaskList = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task._id} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' :
              task.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>{task.status.toUpperCase()}</span>
          </div>
          <p className="text-gray-600 mb-3">{task.description}</p>
          <Link to={`/tasks/${task._id}`} className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
            → View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TaskList