import api from './api';

export const getTasks = async (keyword = '', page = 0, size = 5, sortBy = "startDate", direction = 'asc') => {
    const response = await api.get('/tasks', {params: {keyword, page, size, sortBy, direction}})

    return response.data.data;
}

export const getTaskById = async (id) => {
    const response = await api.post(`/tasks/${id}`);
    return response.data.data;
}

export const createTask = async (task) => {
    const response = await api.post('/tasks/create',
        task,
    )
    return response.data.data;
}

export const updateTask = async (id, task) => {
    const response = await api.post(`/tasks/update/${id}`,
        task,
    )

    return response.data.data;
}

export const deleteTask = async (id) => {
    await api.delete(`/tasks/delete/${id}`);
}