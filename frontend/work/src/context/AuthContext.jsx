import React, { createContext,useState, useEffect, useContext } from 'react';

const AuthContext=createContext()

export const AuthProvider =({Children})=>{
    const [user, setUser] = useState(null);
    useEffect(() =>{
        const storedUser = localStorage.getItem('user');
        setUser(storedUser);
    },[]);
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.setItem("token");
        setUser(null);
}}

return(
    <>
        <AuthContext.Provider value={{ user, login, logout }}>
            {Children}
        </AuthContext.Provider>
    </>
)

export const useAuth = () => useContext(AuthContext);