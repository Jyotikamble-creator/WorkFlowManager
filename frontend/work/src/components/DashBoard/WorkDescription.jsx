import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const WorkDescription = () => {
  const [task, setTask] = useState({});
  const { id } = useParams();

// read all the tasks
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task", error);
      }
    };

    fetchTask();
  }, [id]);

  // displaytheworking tasks
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="mb-1">{task.description}</p>
      <p className="mb-1"><strong>Status:</strong> {task.status}</p>
      <p className="mb-1"><strong>Assigned To:</strong> {task.assignedTo?.username}</p>
      <p className="mb-1"><strong>Created By:</strong> {task.createdBy?.username}</p>
    </div>
  );
};

export default WorkDescription;
