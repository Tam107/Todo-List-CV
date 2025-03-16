import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

import {Button} from "@headlessui/react";
import Navbar from "../components/Navbar.jsx";



const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [hidden, setHidden] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('startDate');
    const [direction, setDirection] = useState('DESC');


    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage,sortBy, direction]);

    const fetchTasks = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const taskData = await getTasks('', page, 5, sortBy, direction);
            console.log("Requested page:", page, "Received data:", taskData);
            console.log("Requested params:", { page, sortBy, direction }, "Received data:", taskData);
            setTasks([...taskData.content]);
            setTotalPages(taskData.totalPages);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load tasks');
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (task) => {
        setLoading(true);
        setError(null);
        try {
            if (editingTask) {
                const updatedTask = await updateTask(editingTask.id, task);
                setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
                setEditingTask(null);
                setHidden(false);
            } else {
                const newTask = await createTask(task);
                setTasks([...tasks, newTask]);
                fetchTasks(currentPage, sortBy, direction);
                setHidden(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save task');
            console.log("Error creating/updating task:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
            fetchTasks(currentPage,sortBy, direction);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setHidden(true);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setHidden(false);
    };

    const handleToggleEdit = () => {
        setHidden(!hidden);
        if (hidden) setEditingTask(null);
    };

    const handleSort = (newSortBy) => {
        if (sortBy === newSortBy) {
            setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(newSortBy);
            setDirection('DESC');
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Navbar />
            {error && (
                <p className="text-red-500 text-center bg-red-100 rounded-md p-2 mb-4">{error}</p>
            )}
            {loading && <p className="text-center">Loading...</p>}

            {/* Search Input */}
            <div className="flex justify-end items-center my-6 space-x-4">
                <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="rounded-md border-gray-300"
                >
                    <option value="startDate">Start Date</option>
                    <option value="endDate">Due Date</option>
                    <option value="status">Status</option>
                </select>
                <Button
                    onClick={handleToggleEdit}
                    className="px-4 py-2 bg-blue-500 font-bold text-white rounded-md hover:bg-red-600 hover:text-white"
                >
                    {hidden ? "Cancel" : "Create Task"}
                </Button>
            </div>

            {hidden && (
                <TaskForm
                    onSubmit={handleCreateOrUpdate}
                    onCancel={handleCancelEdit}
                    initialTask={editingTask || {}}
                />
            )}
            <div className="space-y-4 items-center px-4 flex-col mx-auto">
                {tasks.length === 0 && !loading ? (
                    <p className="text-center text-gray-500">No tasks found. Try adjusting your search or add a new task!</p>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-blue-400 text-white rounded-md disabled:bg-gray-400"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage >= totalPages - 1}
                        className="px-4 py-2 bg-blue-400 text-white rounded-md disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tasks;