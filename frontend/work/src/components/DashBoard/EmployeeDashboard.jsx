import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [commentText, setCommentText] = useState({});

  // Fetch tasks assigned to the employee from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/employee`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  // Update task status by the employee(backend)
  const updateStatus = async (taskID, status) => {
    const token = localStorage.getItem('token');
    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/tasks/${taskID}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  // Handle work submission
  const handleSubmitWork = async (e, taskId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData(e.target);
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}/submit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Work submitted!');
    window.location.reload();
  };

  // Handle comment submission by the employee
  const handleCommentSubmit = async (taskId) => {
    const token = localStorage.getItem('token');
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}/comments`, {
      text: commentText[taskId],
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCommentText(prev => ({ ...prev, [taskId]: '' }));
    window.location.reload();
  };

  const filteredTasks = tasks.filter(task =>
    statusFilter === 'all' ? true : task.status === statusFilter
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>

      {/* Filter dropdown of the tasks result */}
      <select
        className="border mb-4 p-2"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}>

        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* display the tasks */}
      {filteredTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task._id} className="border p-4 rounded shadow mb-6">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: <strong>{task.status}</strong></p>

            <div className="mt-2">
              <button
                onClick={() => updateStatus(task._id, 'in progress')}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                In Progress
              </button>

              <button
                onClick={() => updateStatus(task._id, 'completed')}
                className="bg-green-600 text-white px-3 py-1 rounded">
                Completed
              </button>

            </div>

            {/* Comments  by the employee on the tasks*/}
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Comments</h3>
              {task.comments?.map((c, i) => (
                <div key={i} className="text-sm border-b mb-1">
                  <p><strong>{c.user?.username}</strong>: {c.text}</p>
                  <p className="text-xs text-gray-500">{new Date(c.timestamp).toLocaleString()}</p>
                </div>
              ))}

              {/* submission of the comments */}
              <div className="flex mt-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="border flex-1 p-2 mr-2"
                  value={commentText[task._id] || ''}
                  onChange={(e) =>
                    setCommentText({ ...commentText, [task._id]: e.target.value })
                  }
                />
                <button
                  onClick={() => handleCommentSubmit(task._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Submit completed work */}
            <form
              onSubmit={(e) => handleSubmitWork(e, task._id)}
              encType="multipart/form-data"
              className="mt-4"
            >
              <textarea
                placeholder="Describe completed work..."
                name="note"
                className="border p-2 w-full mt-2"
              />

              <input type="file" name="file" className="mt-2" />
              <button className="bg-blue-600 text-white px-4 py-1 mt-2 rounded">
                Submit Work
              </button>

            </form>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeDashboard;
