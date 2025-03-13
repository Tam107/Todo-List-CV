import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const todoService = {
    getAllTasks: async (params = {}) => {
        try {
            const {
                keyword = '',
                page = 0,
                size = 10,
                sortBy = 'startDate',
                direction = 'DESC'
            } = params;

            const response = await axios.get(`${API_URL}/tasks`, {
                params: { keyword, page, size, sortBy, direction }
            });

            // Kiểm tra và trả về dữ liệu theo đúng cấu trúc
            if (response.data && response.data.data) {
                return response.data.data;  // Vì API trả về trong data.data
            }
            return {
                content: [],
                totalElements: 0,
                totalPages: 0,
                number: 0
            };
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    getTaskById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/tasks/${id}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    createTask: async (taskData) => {
        try {
            const response = await axios.post(`${API_URL}/tasks/create`, taskData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTask: async (id, taskData) => {
        try {
            const response = await axios.put(`${API_URL}/tasks/update`, taskData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTask: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/tasks/delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
