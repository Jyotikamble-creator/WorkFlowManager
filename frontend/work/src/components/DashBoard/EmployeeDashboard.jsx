import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [commentText, setCommentText] = useState({});

  // Fetch tasks assigned to the employee from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks/employee');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Update task status by the employee(backend)
  const updateStatus = async (taskID, status) => {
    try {
      await api.put(`/tasks/${taskID}/status`, { status });
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle work submission
  const handleSubmitWork = async (e, taskId) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      await api.post(`/tasks/${taskId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Work submitted!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting work:', error);
    }
  };

  // Handle comment submission by the employee
  const handleCommentSubmit = async (taskId) => {
    try {
      await api.post(`/tasks/${taskId}/comments`, {
        text: commentText[taskId],
      });
      setCommentText(prev => ({ ...prev, [taskId]: '' }));
      window.location.reload();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    statusFilter === 'all' ? true : task.status === statusFilter
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">👤 Employee Dashboard</h1>

      {/* Filter dropdown of the tasks result */}
      <div className="mb-8 flex items-center gap-4">
        <label className="font-semibold text-gray-700">Filter by Status:</label>
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span className='text-gray-600'>({filteredTasks.length} tasks)</span>
      </div>

      {/* display the tasks */}
      {filteredTasks.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg'>
          <p className='text-gray-500 text-lg'>📭 No tasks assigned to you yet</p>
        </div>
      ) : (
        <div className='space-y-4'>
        {filteredTasks.map((task) => (
          <div key={task._id} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6">
            <div className='flex justify-between items-start mb-3'>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
                <p className="text-gray-600 mt-2">{task.description}</p>
              </div>
              <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>{task.status.toUpperCase()}</span>
            </div>

            <div className="my-4 flex gap-2">
              <button
                onClick={() => updateStatus(task._id, 'in progress')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition font-semibold">
                📊 In Progress
              </button>
              <button
                onClick={() => updateStatus(task._id, 'completed')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition font-semibold">
                ✓ Mark Completed
              </button>
            </div>

            {/* Comments  by the employee on the tasks*/}
            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">💬 Comments</h3>
              <div className='space-y-2 max-h-32 overflow-y-auto mb-3'>
                {task.comments?.length > 0 ? (
                  task.comments.map((c, i) => (
                    <div key={i} className="text-sm bg-gray-50 p-2 rounded border-l-4 border-blue-500">
                      <p className='font-semibold text-gray-800'>{c.createdBy?.name || 'Anonymous'}</p>
                      <p className="text-gray-700">{c.text}</p>
                      <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>No comments yet</p>
                )}
              </div>

              {/* submission of the comments */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="border border-gray-300 flex-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={commentText[task._id] || ''}
                  onChange={(e) =>
                    setCommentText({ ...commentText, [task._id]: e.target.value })
                  }
                />
                <button
                  onClick={() => handleCommentSubmit(task._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Submit completed work */}
            <form
              onSubmit={(e) => handleSubmitWork(e, task._id)}
              encType="multipart/form-data"
              className="mt-6 border-t pt-4"
            >
              <h3 className="font-semibold text-gray-800 mb-3">📤 Submit Work</h3>
              <textarea
                placeholder="Describe your completed work..."
                name="note"
                className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />

              <input type="file" name="file" className="block mb-3 text-gray-700" />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">
                📤 Submit Work
              </button>
            </form>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
