import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const userService = {
    getProfile: async () => {
        try {
            const response = await axios.get(`${API_URL}/users/profile`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateProfile: async (userData) => {
        try {
            const response = await axios.put(`${API_URL}/users/update`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    changePassword: async (oldPassword, newPassword) => {
        try {
            const response = await axios.put(`${API_URL}/users/change-password`, null, {
                params: {
                    oldPassword,
                    newPassword
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteAccount: async () => {
        try {
            const response = await axios.delete(`${API_URL}/users/delete`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
