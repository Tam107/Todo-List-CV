import api from './api.js';

export const getUser = async () => {
    const response = await api.get(`/users/profile`);
    return response.data.data;
}

export const updateUserProfile = async (userData) => {
    const response = await api.put(`/users/profile`, userData);

    return response.data.data;
}

export const deleteUserProfile = async () => {
    const response = await api.delete(`/users/profile`);
    return response.data.data;
}

