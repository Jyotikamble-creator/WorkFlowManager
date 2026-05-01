import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import HistoryLog from './History';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();

  // read the tasks by id 
  useEffect(() => {
    const fetchTask = async () => {
      const response = await api.get(`/tasks/${id}`);
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