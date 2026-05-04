import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [commentInputs, setCommentInputs] = useState({});

  // read all tasks assigned by the manager
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks/manager');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // updated all taks  done by the employee
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}/status`, { status });
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // submission
  const handleCommentSubmit = async (taskId, text) => {
    try {
      await api.post(`/tasks/${taskId}/comments`, { text });
      setCommentInputs({ ...commentInputs, [taskId]: "" });
      window.location.reload();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter(task =>
    statusFilter === "all" ? true : task.status === statusFilter
  );

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      <h1 className='text-4xl font-bold mb-8 text-gray-800'>👔 Manager Dashboard</h1>

      {/* Filter dropdown */}
      <div className="mb-8 flex items-center gap-4">
        <label className="font-semibold text-gray-700">Filter by Status:</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span className='text-gray-600'>({filteredTasks.length} tasks)</span>
      </div>

      {/* Tasks list */}
      <div className='space-y-4'>
        {filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
        <div className='bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6' key={task._id}>
          <div className='flex justify-between items-start mb-3'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>{task.title}</h2>
              <p className='text-gray-600 mt-2'>{task.description}</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' :
              task.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>{task.status.toUpperCase()}</span>
          </div>

          {/* Update Status */}
          <div className="my-4 flex gap-2">
            <button onClick={() => updateStatus(task._id, "in progress")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition font-semibold">📊 In Progress</button>
            <button onClick={() => updateStatus(task._id, "completed")} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition font-semibold">✓ Mark Completed</button>
          </div>

          {/* Comments */}
          <div className='mt-6 border-t pt-4'>
            <h3 className='font-semibold text-gray-800 mb-3'>💬 Comments</h3>
            <div className='space-y-2 max-h-32 overflow-y-auto mb-3'>
              {task.comments?.length > 0 ? (
                task.comments.map((c, i) => (
                  <div key={i} className='text-sm bg-gray-50 p-2 rounded border-l-4 border-blue-500'>
                    <p className='font-semibold text-gray-800'>{c.createdBy?.name || 'Anonymous'}</p>
                    <p className='text-gray-700'>{c.text}</p>
                    <span className='text-xs text-gray-500'>{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className='text-gray-500 text-sm'>No comments yet</p>
              )}
            </div>

            {/* Add comment */}
            <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(task._id, commentInputs[task._id]); }} className='flex gap-2'>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInputs[task._id] || ""}
                onChange={(e) => setCommentInputs({ ...commentInputs, [task._id]: e.target.value })}
                className='flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold'>Send</button>
            </form>
          </div>

          {/* Logs */}
          <div className='mt-4 border-t pt-4'>
            <h3 className='font-semibold text-gray-800 mb-2'>📜 History</h3>
            {task.history?.length > 0 ? (
              <div className='space-y-1 text-xs text-gray-600 max-h-20 overflow-y-auto'>
                {task.history.map((log, i) => (
                  <p key={i}>• {log.action} by {log.by?.name || 'System'} on {new Date(log.at).toLocaleString()}</p>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 text-sm'>No history</p>
            )}
          </div>
        </div>
      ))
        ) : (
          <div className='text-center py-12 bg-white rounded-lg'>
            <p className='text-gray-500 text-lg'>📭 No tasks found with the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;

