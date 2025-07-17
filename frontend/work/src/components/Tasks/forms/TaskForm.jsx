import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate(-1);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="assignedTo" placeholder="Assign to (user ID)" onChange={handleChange} className="border p-2 w-full" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default TaskForm;
