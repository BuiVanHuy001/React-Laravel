import React, {useEffect, useState} from "react";

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

    const login = (userData, token) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
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
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};