import { Navigate } from "react-router-dom";

// ProtectionRoute guards routes based on authentication and user role
// Props:
//   children: The component(s) to render if access is allowed
//   role: (optional) Required user role for this route
const ProtectionRoute = ({ children, role }) => {
    // Get token and user from localStorage
    const token = localStorage.getItem("token");
    let user;
    // Attempt to parse user from localStorage
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        // If parsing fails, redirect to login
        return <Navigate to="/login" />;
    }

    // User must be authenticated
    if (!token || !user) {
        return <Navigate to="/login" />
    }

    // If a role is provided, ensure user has that role; otherwise allow access
    if (role && user.role !== role) {
        // Redirect to the dashboard for the user's actual role
        return <Navigate to={`/${user.role}`} />
    }

    // If all checks pass, render the children
    return children;
}

export default ProtectionRoute;