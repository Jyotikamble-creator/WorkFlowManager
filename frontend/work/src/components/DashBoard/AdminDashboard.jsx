// admin means the head of all the tasks who will moniter the employess
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "" });

  useEffect(() => {
    const token = localStorage.getItem('token');

    // fetch tasks and users(employees)
    const fetchData = async () => {
      const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(userResponse.data)
      const taskResponse = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(taskResponse.data)
    }
    fetchData()
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    // updating the tasks
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");

    }
    setTasks([...tasks, response.data])
    toast.success("Task assigned successfully");
  }

  return (
    <div className="p-4">
      <h1 className='text-3xl font-bold mb-4'>Admin Dashboard</h1>
      <div className='grid grid-cols-2 gap-4'>

        {/* create new tasks */}
        <div>
          <h2 className='font-semibold mb-2'>Assign Task</h2>
          <form onSubmit={handleTaskSubmit}>
            <input
              placeholder='Title'
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              className='border p-2 mb-2 block w-full'
            />

            <textarea
              placeholder='Description'
              value={newTask.description}
              onChange={e => setNewTask({ ...newTask, description: e.target.value })}
              className='border p-2 mb-2 block w-full'
            />

            <select
              value={newTask.assignedTo}
              onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className='border p-2 mb-2 block w-full'
              required
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.username}
                </option>
              ))}
            </select>

            <button className='bg-blue-500 text-white px-4 py-2 rounded'>
              Assign
            </button>
          </form>

        </div>

        <div>
          {/* list of all tasks */}
          <h2 className='font-semibold mb-2'>All Tasks</h2>

          {tasks.map(t => (
            <div key={t._id}>
              <strong>{t.title}</strong>
              <p>{t.description}</p>

              {/* display assigened*/}
              <p>Assigned to: {t.assignedTo?.username}</p>
              <Link to={`/task/${t._id}`} className='text-blue-500'>View</Link>
            </div>

          ))}

        </div>

      </div>
    </div>
  )
}

export default AdminDashboard