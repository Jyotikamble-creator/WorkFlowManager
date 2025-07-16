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
        <Route path="/p"/>

        <Route path="/admin" element={<ProtectionRoute role="admin"><AdminDashboard /></ProtectionRoute> }/>
        <Route path="/employee" element={<ProtectionRoute role="employee"><EmployeeDashboard /> </ProtectionRoute>} />
        <Route path="/manager" element={<ProtectionRoute role="manager"><ManagerDashboard /></ProtectionRoute>} />
        <Route path="/task/:id" element={<WorkDescription />} />

        <Route path ="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App