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

    // user must be authenticated
    if (!token || !user) {
        return <Navigate to="/login" />
    }

    // if role is provided, ensure user has that role; otherwise allow access
    if (role && user.role !== role) {
        return <Navigate to={`/${user.role}`} />
    }

    return children;
}

export default ProtectionRoute;