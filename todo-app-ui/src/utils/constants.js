export const API_BASE_URL = 'http://localhost:8080/api';
export const TOKEN_KEY = 'todo_app_token';

export const PRIORITIES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
};

export const STATUS = {
    PENDING: 'PENDING',
    DOING: 'DOING',
    DONE: 'DONE',
};

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    TASKS: '/tasks',
    PROFILE: '/profile',
};

export const ERROR_MESSAGES = {
    GENERIC: 'Something went wrong. Please try again.',
    UNAUTHORIZED: 'Please login to continue.',
    NETWORK: 'Network error. Please check your connection.',
};
