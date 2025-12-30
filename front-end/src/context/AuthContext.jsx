import React, {useEffect, useState, useContext} from "react";
import {loginRequest, logoutRequest} from "../services/authService.js";

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('access_token');

        if (user && token) {
            setUser(user);
        }
        setLoading(false);
    }, [])

    const login = async (credentials) => {
        try {
            const response = await loginRequest(credentials);

            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
        } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            setUser(null);
            throw new Error('Login failed: ' + error.message);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            setLoading,
            isAuthenticated: !!user,
            login,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};