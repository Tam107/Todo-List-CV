import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });
            if (response.data.data.token) {
                localStorage.setItem('token', response.data.data.token);
                // Thêm token vào headers cho các request tiếp theo
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (registerData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, registerData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        } catch (error) {
            throw error;
        }
    }
};
