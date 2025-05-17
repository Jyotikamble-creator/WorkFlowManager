import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

const WorkDescription = () => {

  const [task, setTask] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token")
      const response = await axios.get('', { headers: { Authorization: `Bearer ${token}` } })
      setTask(response.data)
    }
    fetchTask();
  }, [id])

  return (
    <div>
      <h1>{task.tittle}</h1>
      <p>{task.description}</p>
      <p>Status:{task.status}</p>
      <p>Assigned To:{task.assignedTo?.username}</p>
      <p>Created By:{task.createdBy?.username}</p>
    </div>
  )
}

export default WorkDescription;