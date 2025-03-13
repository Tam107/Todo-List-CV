import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Task API
export const taskApi = {
    getTasks: async (params) => {
        const { keyword = '', page = 0, size = 10, sortBy = 'startDate', direction = 'DESC' } = params;
        const response = await axios.get(`${API_URL}/tasks`, {
            params: { keyword, page, size, sortBy, direction }
        });
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await axios.post(`${API_URL}/tasks`, taskData);
        return response.data;
    },

    updateTask: async (taskId, taskData) => {
        const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
        return response.data;
    },

    deleteTask: async (taskId) => {
        await axios.delete(`${API_URL}/tasks/${taskId}`);
    }
};

// User API
export const userApi = {
    getCurrentUser: async () => {
        const response = await axios.get(`${API_URL}/auth/profile`);
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await axios.put(`${API_URL}/users/update`, userData);
        return response.data;
    }
};
