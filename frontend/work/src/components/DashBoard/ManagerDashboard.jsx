import React,{ useState, useEffect} from 'react'
import axios from 'axios'

const ManagerDashboard = () => {

  const[tasks,setTasks]=useState([])

  useEffect(()=>{
    const fetchTasks=async()=>{
      const response=await axios.get('',{headers:{Authorization:`Bear${token}`}})
      const token=localStorage.getItem("token")
      setTasks(response.data)
    }
    fetchTasks()
      
    
  },[])

  const updateStatus=async(id,status)=>{
    const token=localStorage.getItem("token")
    await axios.put('',{status},{headers:{Authorization:`Bearer ${token}`}})
    window.location.reaload();

  }
  
  return (
    <div className='p-4'>
      <h1 className='text-3xl'>ManagerDashboard</h1>
      {tasks.map(t=>(<div classname='text-3xl' key={t.id}>{t.name}</div>))}
      <h2>{t.tittle}
        
      </h2>
      <p>{t.description}</p>
      <p> Status:{t.status}</p>
      <button onClick={()=>updateStatus(t.id,"in progress")}>In Progress</button>
      <button onClick={()=>updateStatus(t.id,"copmleted")}>completed</button>
      </div>
  )
}

export default ManagerDashboard;