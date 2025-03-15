import api from './api.js';

export const getUser = async () => {
    const response = await api.get(`/users/profile`);
    return response.data.data;
}