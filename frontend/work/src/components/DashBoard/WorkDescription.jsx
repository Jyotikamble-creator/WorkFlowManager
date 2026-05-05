
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import { clientLogger, LogTags } from '../../utils/logger';

// WorkDescription component displays detailed information about a single task
// including its status, assigned user, and creator.
const WorkDescription = () => {
  // State to store the task object
  const [task, setTask] = useState({});
  // Get the task ID from the URL params
  const { id } = useParams();

  // Fetch the task details by ID when component mounts or ID changes
  useEffect(() => {
    clientLogger.info(LogTags.PAGE_LOAD, 'WorkDescription loaded', { id });
    const fetchTask = async () => {
      try {
        // Get task details from backend
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
        clientLogger.info(LogTags.TASK_FETCH, `Fetched task details for ${id}`);
      } catch (error) {
        clientLogger.error(LogTags.TASK_FETCH, `Failed to fetch task ${id}`, error);
      }
    };

    fetchTask();
  }, [id]);

  // Render the task details UI
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Task title and description */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{task.title}</h1>
        <p className="text-gray-600 text-lg mb-8">{task.description}</p>
        
        {/* Task info grid: status, assigned to, created by */}
        <div className="grid grid-cols-2 gap-6 border-t pt-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">Status</p>
            <p className={`text-xl font-bold ${
              task.status === 'completed' ? 'text-green-600' :
              task.status === 'in progress' ? 'text-yellow-600' :
              'text-red-600'
            }`}>{task.status?.toUpperCase() || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">Assigned To</p>
            <p className="text-xl font-bold text-gray-800">{task.assignedTo?.name || task.assignedTo?.email || 'Unassigned'}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">Created By</p>
            <p className="text-xl font-bold text-gray-800">{task.createdBy?.name || task.createdBy?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDescription;
