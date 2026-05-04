import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignedTo: '' });

  // read all tasks assigned by the manager
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tasksResponse = await api.get('/tasks/manager');
        setTasks(tasksResponse.data);

        const usersResponse = await api.get('/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update task status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      setTasks(tasks.map(t => t._id === id ? { ...t, status } : t));
      toast.success('Task status updated!');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Create new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim() || !taskForm.assignedTo) {
      toast.warning('Please fill in all required fields');
      return;
    }
    try {
      const response = await api.post('/tasks', taskForm);
      setTasks([...tasks, response.data]);
      setTaskForm({ title: '', description: '', assignedTo: '' });
      toast.success('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  // Add comment
  const handleCommentSubmit = async (taskId) => {
    const text = commentInputs[taskId]?.trim();
    if (!text) {
      toast.warning('Comment cannot be empty');
      return;
    }
    try {
      await api.post(`/comments/${taskId}`, { text });
      setCommentInputs({ ...commentInputs, [taskId]: "" });
      // Refresh tasks to show new comment
      const response = await api.get('/tasks/manager');
      setTasks(response.data);
      toast.success('Comment added!');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to add comment');
    }
  };

  // Filter tasks based on status and search
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === "all" ? true : task.status === statusFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'open' || t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className='p-8 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className="mb-8">
        <h1 className='text-4xl font-bold text-gray-800 mb-2'>👔 Manager Dashboard</h1>
        <p className='text-gray-600'>Manage and track your assigned tasks</p>
      </div>

      {/* Task Creation Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>📝 Create & Assign Task</h2>
        <form onSubmit={handleCreateTask} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Task Title *</label>
              <input
                type='text'
                placeholder='Enter task title'
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Assign to Employee *</label>
              <select
                value={taskForm.assignedTo}
                onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>Select an employee</option>
                {users.filter(u => u.role === 'employee').map(user => (
                  <option key={user._id} value={user._id}>{user.name || user.email}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Description</label>
            <textarea
              placeholder='Enter task description'
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition'
          >
            Create Task
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-semibold mb-1">Total Tasks</p>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-semibold mb-1">Pending</p>
          <p className="text-3xl font-bold text-red-600">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-semibold mb-1">In Progress</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm font-semibold mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Filter by Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className='w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="all">All Tasks ({stats.total})</option>
              <option value="pending">Pending ({stats.pending})</option>
              <option value="in progress">In Progress ({stats.inProgress})</option>
              <option value="completed">Completed ({stats.completed})</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Search Tasks</label>
            <input 
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

      {/* Tasks list */}
      {loading ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Loading tasks...</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div className='bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-6' key={task._id}>
                {/* Task Header */}
                <div className='flex justify-between items-start mb-4'>
                  <div className="flex-1">
                    <h2 className='text-2xl font-bold text-gray-800'>{task.title}</h2>
                    <p className='text-gray-600 mt-2'>{task.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ml-4 ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>{task.status?.toUpperCase() || 'OPEN'}</span>
                </div>

                {/* Task Info */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b text-sm">
                  <div>
                    <p className="text-gray-600 font-semibold">Assigned To:</p>
                    <p className="text-gray-800">{task.assignedTo?.name || task.assignedTo?.email || 'Unassigned'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Created:</p>
                    <p className="text-gray-800">{new Date(task.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Priority:</p>
                    <p className="text-gray-800">{task.priority || 'Medium'}</p>
                  </div>
                </div>

                {/* Update Status */}
                <div className="mb-6 flex gap-2 flex-wrap">
                  <button 
                    onClick={() => updateStatus(task._id, "in progress")} 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition font-semibold"
                  >
                    📊 Start
                  </button>
                  <button 
                    onClick={() => updateStatus(task._id, "completed")} 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold"
                  >
                    ✓ Complete
                  </button>
                  {task.status !== 'open' && (
                    <button 
                      onClick={() => updateStatus(task._id, "open")} 
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition font-semibold"
                    >
                      ↩ Reopen
                    </button>
                  )}
                </div>

                {/* Comments Section */}
                <div className='border-t pt-4 mb-4'>
                  <h3 className='font-bold text-gray-800 mb-3'>💬 Comments ({task.comments?.length || 0})</h3>
                  
                  {/* Comments List */}
                  <div className='space-y-2 max-h-40 overflow-y-auto mb-3 bg-gray-50 p-3 rounded'>
                    {task.comments?.length > 0 ? (
                      task.comments.map((c, i) => (
                        <div key={i} className='text-sm bg-white p-3 rounded border-l-4 border-blue-500'>
                          <div className="flex justify-between items-start">
                            <p className='font-semibold text-gray-800'>{c.createdBy?.name || 'Anonymous'}</p>
                            <span className='text-xs text-gray-500'>{new Date(c.createdAt).toLocaleString()}</span>
                          </div>
                          <p className='text-gray-700 mt-1'>{c.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className='text-gray-500 text-sm text-center py-2'>No comments yet</p>
                    )}
                  </div>

                  {/* Add Comment */}
                  <div className='flex gap-2'>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[task._id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [task._id]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(task._id)}
                      className='flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                    />
                    <button
                      onClick={() => handleCommentSubmit(task._id)}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold'
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* History Section */}
                {task.history && task.history.length > 0 && (
                  <div className='border-t pt-4'>
                    <h3 className='font-bold text-gray-800 mb-2'>📜 Recent Activity</h3>
                    <div className='space-y-1 text-xs text-gray-600 max-h-24 overflow-y-auto'>
                      {task.history.slice(0, 5).map((log, i) => (
                        <p key={i} className="flex items-center gap-2">
                          <span className="text-lg">•</span>
                          <span><strong>{log.by?.name || 'System'}</strong> {log.action}</span>
                          <span className="ml-auto text-gray-500">{new Date(log.at).toLocaleTimeString()}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='text-center py-12 bg-white rounded-lg border border-gray-200'>
              <p className='text-gray-500 text-lg'>🎉 No tasks found with the selected filter</p>
              <p className='text-gray-400 mt-2'>{searchQuery ? 'Try adjusting your search' : 'Start by creating a new task!'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;

