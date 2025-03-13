import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from "../components/common/Loading.jsx";

const API_URL = 'http://localhost:8080/api/auth';
const API_URL_USER = 'http://localhost:8080/api';
const TOKEN_KEY = 'authToken';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            getCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_URL_USER}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setUser(response.data || { username: 'User' });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error fetching current user:', error);
            localStorage.removeItem(TOKEN_KEY);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const setAuthToken = (token) => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem(TOKEN_KEY);
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`,
                {
                    username,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data && response.data.data) {
                const token = response.data.data.token;
                setAuthToken(token);
                setIsAuthenticated(true);
                await getCurrentUser();
                return response.data;
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsAuthenticated(false);
            if (error.response) {
                throw new Error(error.response.data?.message || 'Login failed');
            }
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/register`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { token, user: newUser } = response.data;
            setAuthToken(token);
            setUser(newUser);
            setIsAuthenticated(true);

            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Registration failed');
            }
            throw new Error('Network error occurred');
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/logout`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setAuthToken(null);
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const updateProfile = async (userData) => {
        try {
            const response = await axios.put(`${API_URL}/users/update`,
                userData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setUser(response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Profile update failed');
            }
            throw new Error('Network error occurred');
        }
    };

    const changePassword = async (passwordData) => {
        try {
            const response = await axios.post(`${API_URL}/change-password`,
                passwordData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Password change failed');
            }
            throw new Error('Network error occurred');
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post(`${API_URL}/forgot-password`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Password reset request failed');
            }
            throw new Error('Network error occurred');
        }
    };

    const resetPassword = async (token, newPassword) => {
        try {
            const response = await axios.post(`${API_URL}/reset-password`,
                {
                    token,
                    newPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Password reset failed');
            }
            throw new Error('Network error occurred');
        }
    };

    const verifyEmail = async (token) => {
        try {
            const response = await axios.post(`${API_URL}/verify-email`,
                { token },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Email verification failed');
            }
            throw new Error('Network error occurred');
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        forgotPassword,
        resetPassword,
        verifyEmail
    };

    if (loading) {
        return <div><Loading/></div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
