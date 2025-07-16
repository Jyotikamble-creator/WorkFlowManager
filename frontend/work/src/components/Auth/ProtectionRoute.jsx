import { Navigate } from "react-router-dom";

const ProtectionRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    let user;
    // Attempt to parse user from localStorage
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        return <Navigate to="/login" />;
    }

    // user role check
    if (!token || !user) {
        return <Navigate to="/login" />
    }

    // navigate to their dashboard based on role
    if (user.role !== role) {
        return <Navigate to={`/${user.role}`} />
    }

    return children;
}

export default ProtectionRoute;