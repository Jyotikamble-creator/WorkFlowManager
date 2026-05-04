import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';


const WorkDescription = () => {
  const [task, setTask] = useState({});
  const { id } = useParams();

// read all the tasks
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task", error);
      }
    };

    fetchTask();
  }, [id]);

  // displaytheworking tasks
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{task.title}</h1>
        <p className="text-gray-600 text-lg mb-8">{task.description}</p>
        
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
