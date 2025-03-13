import { useState, useCallback } from 'react';
import { todoService } from '../services/todo.service';

export const useTodo = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await todoService.getAllTodos();
            setTodos(data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch todos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createTodo = useCallback(async (todoData) => {
        try {
            await todoService.createTodo(todoData);
            fetchTodos();
        } catch (err) {
            throw err;
        }
    }, [fetchTodos]);

    const updateTodo = useCallback(async (id, todoData) => {
        try {
            await todoService.updateTodo(id, todoData);
            fetchTodos();
        } catch (err) {
            throw err;
        }
    }, [fetchTodos]);

    const deleteTodo = useCallback(async (id) => {
        try {
            await todoService.deleteTodo(id);
            fetchTodos();
        } catch (err) {
            throw err;
        }
    }, [fetchTodos]);

    const updateTodoStatus = useCallback(async (id, status) => {
        try {
            await todoService.updateTodoStatus(id, status);
            fetchTodos();
        } catch (err) {
            throw err;
        }
    }, [fetchTodos]);

    return {
        todos,
        isLoading,
        error,
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        updateTodoStatus,
    };
};
