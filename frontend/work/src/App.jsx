import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Auth/login'
import SignUp from './components/Auth/SignUp'
import AdminDashboard from './components/DashBoard/AdminDashboard'
import EmployeeDashboard from './components/DashBoard/EmployeeDashboard'
import ManagerDashboard from './components/DashBoard/ManagerDashboard'
import WorkDescription from './components/DashBoard/WorkDescription'

function App() {
  const [count, setCount] = useState();

  return (
    <>
      {/* <Login/> */}
      {/* <SignUp/> */}
      {/* <AdminDashboard/> */}
      {/* <EmployeeDashboard/> */}
      {/* <ManagerDashboard/> */}
      {/* <WorkDescription/> */}
    </>
  )
}

export default App
