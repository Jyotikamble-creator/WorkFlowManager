import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import HistoryLog from './HistoryLog';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask(response.data);
    };
    fetchTask();
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: <strong>{task.status}</strong></p>
      <p>Assigned To: {task.assignedTo?.username}</p>
      <p>Created By: {task.createdBy?.username}</p>
      <CommentList comments={task.comments} />
      <HistoryLog logs={task.logs} />
    </div>
  );
};

export default TaskDetails;