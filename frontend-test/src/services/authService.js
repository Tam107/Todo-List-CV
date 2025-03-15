import api from './api';

export const register = async (username, email, password) => {
    const response = await api.post('/auth/register', {
        username: username,
        email: email,
        password: password });
    const { access_token, refresh_token } = response.data.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return response.data.data;
};

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, refresh_token } = response.data.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return response.data.data;
};

export const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const isAuthenticated = () => !!localStorage.getItem('access_token');