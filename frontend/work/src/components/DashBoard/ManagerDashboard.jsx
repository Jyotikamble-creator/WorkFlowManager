import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [commentInputs, setCommentInputs] = useState({});

  // read all tasks assigned by the manager
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/manager`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  // updated all taks  done by the employee
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  // submission
  const handleCommentSubmit = async (taskId, text) => {
    const token = localStorage.getItem("token");
    await axios.post(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/comments`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCommentInputs({ ...commentInputs, [taskId]: "" });
    window.location.reload();
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter(task =>
    statusFilter === "all" ? true : task.status === statusFilter
  );

  return (
    <div className='p-4'>
      <h1 className='text-3xl mb-4 font-bold'>Manager Dashboard</h1>

      {/* Filter dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by status:</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='border p-2 rounded'>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Tasks list */}
      {filteredTasks.map(task => (
        <div className='border p-4 rounded shadow mb-4' key={task._id}>
          <h2 className='text-xl font-semibold'>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: <strong>{task.status}</strong></p>

          {/* Update Status */}
          <div className="my-2">
            <button onClick={() => updateStatus(task._id, "in progress")} className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded">In Progress</button>
            <button onClick={() => updateStatus(task._id, "completed")} className="bg-green-600 text-white px-3 py-1 rounded">Completed</button>
          </div>

          {/* Comments */}
          <div className='mt-4'>
            <h3 className='font-semibold mb-2'>Comments</h3>
            {task.comments?.map((c, i) => (
              <div key={i} className='text-sm border-b mb-1'>
                <p><strong>{c.user?.username}</strong>: {c.text}</p>
                <span className='text-xs text-gray-500'>{new Date(c.timestamp).toLocaleString()}</span>
              </div>
            ))}

            {/* Add comment */}
            <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(task._id, commentInputs[task._id]); }}>
              <input
                type="text"
                placeholder="Add comment..."
                value={commentInputs[task._id] || ""}
                onChange={(e) => setCommentInputs({ ...commentInputs, [task._id]: e.target.value })}
                className='border p-2 rounded w-full mt-2'
              />
              <button className='bg-blue-500 text-white px-4 py-1 rounded mt-1'>Send</button>
            </form>
          </div>

          {/* Logs */}
          <div className='mt-4'>
            <h3 className='font-semibold'>History</h3>
            {task.logs?.map((log, i) => (
              <p key={i} className='text-xs text-gray-600'>
                {log.action} by {log.user?.username} on {new Date(log.timestamp).toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagerDashboard;

