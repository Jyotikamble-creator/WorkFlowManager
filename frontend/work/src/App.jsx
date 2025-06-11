import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import AdminDashboard from './components/DashBoard/AdminDashboard'
import EmployeeDashboard from './components/DashBoard/EmployeeDashboard'
import ManagerDashboard from './components/DashBoard/ManagerDashboard'
import WorkDescription from './components/DashBoard/WorkDescription'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/task/:id" element={<WorkDescription />} />
      </Routes>
    </Router>
  )
}

export default App