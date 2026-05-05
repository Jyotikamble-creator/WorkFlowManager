import React, { useState } from 'react';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

// TaskForm component provides a form to create a new task
const TaskForm = () => {
  // State for the form fields
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '' });
  // React Router hook to navigate after submission
  const navigate = useNavigate();

  // Update form state on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/tasks', form); // Send form data to backend
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="p-8">
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">📝 Create New Task</h2>
        {/* Task creation form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6">

          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Task Title</label>
            {/* Input for task title */}
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Description</label>
            {/* Input for task description */}
            <textarea
              name="description"
              placeholder="Enter task description"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" 
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-2'>Assign to (User ID)</label>
            {/* Input for user ID to assign the task to */}
            <input
              type="text"
              name="assignedTo"
              placeholder="Enter user ID"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
