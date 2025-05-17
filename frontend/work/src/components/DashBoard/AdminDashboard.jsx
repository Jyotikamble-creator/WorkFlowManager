import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

  const [task, setTask] = useState([]);
  const [user, setUser] = useState([]);
  const [newTask, setNewTask] = useState({title:"",description:"",assignedTo:""});

  useEffect(() => {
    const fetchTasks = async () => {
      const userResponse = await axios.get('',{

        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }
        );
      const token = localStorage.getItem('token');

 const taskResponse = await axios.get("",{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }
        );
    setUser(userResponse.data);
    setTask(taskResponse.data);

    }
    fetchTasks();

   

  },[]);

  const handleTaskChange =async (e) => {
     await axios.post("",{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}},);
    const token = localStorage.getItem('token');
    window.location.reload();
  }


  return (
    <div className="p-4">
      <h1 className='text-3xl font-bold mb-4'>AdminDashboard</h1>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <h2 className='font-semibold mb-2'>Assign Task</h2>
          {/* assign taksform */}
          <input 
          placeholder='Title'
          onChange={(e)=> setNewTask({ ...newTask, title:e.target.value})}
          className='border p-2 mb-2 block w-full' >
          </input>

          <textarea 
placeholder='Description'
          onChange={(e)=> setNewTask({ ...newTask, description:e.target.value})}
          className='border p-2 mb-2 block w-full'>
          </textarea>

          <select
          onChange={(e)=> setNewTask({ ...newTask, assignedTo:e.target.value})}
          className='border p-2 mb-2 block w-full'>
            
            <option>Manager</option>
            {user.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}

          </select>
          <button
          onClick={(e)}
          className='bg-blue-500 text-white px-4 py-2 rounded'
          >Assign</button>
        </div>

        {/* view all task */}
        <div>
          <h2
          className='font-semibold mb-2'>AllTask</h2>
          <div key={t._id} >
            <strong>
{t.title}
            </strong>
            <p>{t.description}</p>
            <p>Assigned to: {t.assignedTo?.username}</p>
            <Link to={`/task/${t._id}`} className='text-blue-500'>View</Link>
          </div>
        </div>
      </div>


    </div>
  )
}

export default AdminDashboard;