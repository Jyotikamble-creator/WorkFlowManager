// admin means the head of all the tasks who will moniter the employess
import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../Common/Layout'

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "" });

  useEffect(() => {
    const token = localStorage.getItem('token');

    // fetch tasks and users(employees)
    const fetchData = async () => {
      try {
        const userResponse = await api.get('/users');
        setUsers(userResponse.data || []);
        const taskResponse = await api.get('/tasks');
        setTasks(taskResponse.data || []);
      } catch (err) {
        console.error('Error fetching admin data', err);
      }
    }
    fetchData()
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    // updating the tasks
    try {
      const response = await api.post('/tasks', newTask);
      setTasks([...tasks, response.data]);
      toast.success("Task assigned successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    }
  }

  // display on the browser
  return (
    <div className="p-8">
      <h1 className='text-4xl font-bold mb-8 text-gray-800'>👨‍💼 Admin Dashboard</h1>
      <div className='grid grid-cols-2 gap-8'>

        {/* create new tasks */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-4'>📝 Create & Assign Task</h2>
          <form onSubmit={handleTaskSubmit} className='space-y-4'>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Task Title</label>
              <input
                placeholder='Enter task title'
                value={newTask.title}
                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Description</label>
              <textarea
                placeholder='Enter task description'
                value={newTask.description}
                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24'
              />
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2'>Assign to User</label>
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

        <div className='bg-white rounded-lg shadow-lg p-6'>
          {/* list of all tasks */}
          <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-4'>📋 All Tasks ({tasks.length})</h2>
          <div className='space-y-4 max-h-96 overflow-y-auto'>
            {tasks.length > 0 ? (
              tasks.map(t => (
                <div key={t._id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition'>
                  <h3 className='font-bold text-lg text-gray-800'>{t.title}</h3>
                  <p className='text-gray-600 text-sm mt-1'>{t.description}</p>
                  <p className='text-gray-500 text-sm mt-2'>Assigned to: <span className='font-semibold text-blue-600'>{t.assignedTo?.name || t.assignedTo?.email || 'N/A'}</span></p>
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