// AdminDashboard.jsx
// This component is the main dashboard for the Admin user.
// Admin can view all users, assign tasks, and see all tasks in the system.

import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../Common/Layout'
import { clientLogger, LogTags } from '../../utils/logger';

const AdminDashboard = () => {
  // State to store all tasks
  const [tasks, setTasks] = useState([]);
  // State to store all users (employees)
  const [users, setUsers] = useState([]);
  // State for the new task form
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "" });

  useEffect(() => {
    clientLogger.info(LogTags.PAGE_LOAD, 'AdminDashboard loaded');
    // On mount, fetch all users and tasks from the backend
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        // Fetch all users (employees)
        const userResponse = await api.get('/users');
        setUsers(userResponse.data || []);
        // Fetch all tasks
        const taskResponse = await api.get('/tasks');
        setTasks(taskResponse.data || []);
        clientLogger.info(LogTags.TASK_FETCH, 'Admin fetched users and tasks');
      } catch (err) {
        clientLogger.error(LogTags.TASK_FETCH, 'Error fetching admin data', err);
      }
    }
    fetchData()
  }, []);

  // Handle form submission for creating a new task
  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    clientLogger.info(LogTags.TASK_CREATE, 'Admin creating new task', newTask);
    try {
      // Send new task data to backend
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data]); // Add new task to state
      toast.success("Task assigned successfully");
      clientLogger.info(LogTags.TASK_CREATE, 'Task assigned successfully', response.data);
    } catch (error) {
      clientLogger.error(LogTags.TASK_CREATE, 'Failed to create task', error);
      toast.error("Failed to create task");
    }
  }

  // Render the Admin dashboard UI
  return (
    <div className="p-8">
      {/* Dashboard Title */}
      <h1 className='text-4xl font-bold mb-8 text-gray-800'>👨‍💼 Admin Dashboard</h1>
      <div className='grid grid-cols-2 gap-8'>

        {/* Left: Create new tasks */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-4'>📝 Create & Assign Task</h2>
          {/* Task creation form */}
          <form onSubmit={handleTaskSubmit} className='space-y-4'>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Task Title</label>
              {/* Input for task title */}
              <input
                placeholder='Enter task title'
                value={newTask.title}
                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Description</label>
              {/* Input for task description */}
              <textarea
                placeholder='Enter task description'
                value={newTask.description}
                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24'
              />
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Assign to User</label>
              {/* Dropdown to select user to assign task to */}
              <select
                value={newTask.assignedTo}
                onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}
                className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>{user.name || user.email}
                  </option>
                ))}
              </select>
            </div>

            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition'>
              Assign Task
            </button>
          </form>
        </div>

        {/* Right: List of all tasks */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-4'>📋 All Tasks ({tasks.length})</h2>
          {/* List all tasks assigned by admin */}
          <div className='space-y-4 max-h-96 overflow-y-auto'>
            {tasks.length > 0 ? (
              tasks.map(t => (
                <div key={t._id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition'>
                  {/* Task title and description */}
                  <h3 className='font-bold text-lg text-gray-800'>{t.title}</h3>
                  <p className='text-gray-600 text-sm mt-1'>{t.description}</p>
                  <p className='text-gray-500 text-sm mt-2'>Assigned to: <span className='font-semibold text-blue-600'>{t.assignedTo?.name || t.assignedTo?.email || 'N/A'}</span></p>
                  {/* Link to view task details */}
                  <Link to={`/task/${t._id}`} className='inline-block mt-3 text-blue-600 hover:text-blue-800 font-semibold'>→ View Details</Link>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-center py-8'>No tasks yet. Create one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard