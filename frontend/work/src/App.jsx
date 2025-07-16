import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import AdminDashboard from './components/DashBoard/AdminDashboard'
import EmployeeDashboard from './components/DashBoard/EmployeeDashboard'
import ManagerDashboard from './components/DashBoard/ManagerDashboard'
import WorkDescription from './components/DashBoard/WorkDescription'
import ProtectionRoute from './components/Auth/ProtectionRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/p"

        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/task/:id" element={<WorkDescription />} />

        <Route path ="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App