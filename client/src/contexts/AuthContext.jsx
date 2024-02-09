import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { setHeaderToken } from '../services/api';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }){
    // Store global auth props & methods to access anywhere in the app
    let navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getCurrentUser()
        setUser(userData);
    }, [])

    // Register & Login
    const loginSaveUser = async (data) => {
        const { token } = data;
        localStorage.setItem("userToken", token);
        setUser(jwtDecode(token));
        setHeaderToken();
    }

    // Retrieve the user from localStorage
    function getCurrentUser(){
        try {
            // Check to see if there's a user
            let token = localStorage.getItem("userToken")
            // If so it saves it and parses as JSON
            const savedUser = jwtDecode(token);
            return savedUser
        } catch (error) {
            return null
        }
    }

    // Logout
    const logout = () => {
        localStorage.removeItem("userToken");
        setUser(null);
        navigate('/login');
        setHeaderToken();
    }

    const value = {
        user,
        loginSaveUser,
        getCurrentUser,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext