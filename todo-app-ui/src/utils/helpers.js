import { format, parseISO } from 'date-fns';

export const formatDate = (date) => {
    if (!date) return '';
    try {
        return format(parseISO(date), 'PPP');
    } catch (error) {
        return '';
    }
};

export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
};

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    // Ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
};


export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const handleApiError = (error) => {
    if (error.response) {
        // Request made and server responded
        if (error.response.data?.message) {
            return error.response.data.message;
        }
        if (error.response.status === 401) {
            return 'Unauthorized access. Please login again.';
        }
        if (error.response.status === 403) {
            return 'You do not have permission to perform this action.';
        }
        if (error.response.status === 404) {
            return 'The requested resource was not found.';
        }
        if (error.response.status >= 500) {
            return 'Server error. Please try again later.';
        }
    } else if (error.request) {
        // Request made but no response received
        return 'No response from server. Please check your internet connection.';
    } else {
        // Something happened in setting up the request
        return 'An unexpected error occurred.';
    }
    return 'An unexpected error occurred.';
};

