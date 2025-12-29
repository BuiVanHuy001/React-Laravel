import {useAuth} from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

export const AuthRoute = ({ type = 'private' }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    if (type === 'guest' && isAuthenticated) {
        return <Navigate to="/users" replace />;
    }

    if (type === 'private' && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};