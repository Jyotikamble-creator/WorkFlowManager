import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import HistoryLog from './History';

// TaskDetails component displays detailed information about a single task
// including its status, assignment, comments, and history log.
const TaskDetails = () => {
  // State to store the task object
  const [task, setTask] = useState(null);
  // Get the task ID from the URL params
  const { id } = useParams();

  // Fetch the task details by ID when component mounts or ID changes
  useEffect(() => {
    const fetchTask = async () => {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
    };
    fetchTask();
  }, [id]);

  // Show loading state if task is not loaded yet
  if (!task) return <div className='text-center py-12'><p className='text-lg text-gray-600'>Loading...</p></div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Task title and description */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{task.title}</h1>
        <p className="text-gray-600 mb-6 text-lg">{task.description}</p>
        
        {/* Task info grid: status, assigned to, created by */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold">Status</p>
            <p className={`text-lg font-bold ${
              task.status === 'completed' ? 'text-green-600' :
              task.status === 'in progress' ? 'text-yellow-600' :
              'text-red-600'
            }`}>{task.status.toUpperCase()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold">Assigned To</p>
            <p className="text-lg font-bold text-gray-800">{task.assignedTo?.name || task.assignedTo?.email || 'Unassigned'}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm font-semibold">Created By</p>
            <p className="text-lg font-bold text-gray-800">{task.createdBy?.name || task.createdBy?.email}</p>
          </div>
        </div>
        
        {/* Comments and history log */}
        <CommentList comments={task.comments} />
        <HistoryLog logs={task.history} />
      </div>
    </div>
  );
};

export default TaskDetails;