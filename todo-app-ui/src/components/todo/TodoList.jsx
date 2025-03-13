import { useState, useEffect } from 'react';
import { todoService } from '../../services/todo.service';
import Pagination from '../common/Pagination.jsx';
import TodoItem from './TodoItem.jsx';
import TodoForm from './TodoForm.jsx'; // Import the TodoForm
import Button from '../common/Buton.jsx';
import Input from '../common/Input.jsx';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { handleApiError } from '../../utils/helpers';

const TodoList = () => {
    // State for todo list
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
    });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState('startDate');
    const [direction, setDirection] = useState('DESC');

    // State for TodoForm
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, [pagination.page, sortBy, direction]);

    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const response = await todoService.getAllTasks({
                keyword: searchKeyword,
                page: pagination.page,
                size: pagination.size,
                sortBy,
                direction
            });

            if (response && response.content) {
                setTodos(response.content);
                setPagination({
                    ...pagination,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    page: response.number
                });
            } else {
                setTodos([]);
                setPagination({
                    ...pagination,
                    totalPages: 0,
                    totalElements: 0
                });
            }
            setError('');
        } catch (err) {
            setError(handleApiError(err));
            setTodos([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await todoService.deleteTask(id);
            fetchTodos();
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, page: 0 });
        fetchTodos();
    };

    const handleSort = (newSortBy) => {
        if (sortBy === newSortBy) {
            setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(newSortBy);
            setDirection('DESC');
        }
    };

    const handlePageChange = (newPage) => {
        setPagination({ ...pagination, page: newPage });
    };

    // New methods for TodoForm
    const handleOpenCreateForm = () => {
        setSelectedTodo(null);
        setIsFormOpen(true);
    };

    const handleOpenEditForm = (todo) => {
        setSelectedTodo(todo);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedTodo(null);
        fetchTodos(); // Refresh the list after adding/editing
    };

    return (
        <div className="space-y-4 relative">
            {/* Existing list header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <Button
                    onClick={handleOpenCreateForm}
                    className="flex items-center"
                >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    New Task
                </Button>
            </div>

            {/* Existing search and sort section */}
            <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            className="pr-10"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </form>

                <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="rounded-md border-gray-300"
                >
                    <option value="startDate">Start Date</option>
                    <option value="endDate">Due Date</option>
                    <option value="status">Status</option>
                </select>
            </div>

            {/* Existing error and loading states */}
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        {todos.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">
                                No tasks found
                            </p>
                        ) : (
                            todos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onDelete={() => handleDelete(todo.id)}
                                    onEdit={() => handleOpenEditForm(todo)}
                                />
                            ))
                        )}
                    </div>

                    {pagination.totalPages > 1 && (
                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}

            {/* TodoForm Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>
                        <TodoForm
                            initialData={selectedTodo}
                            onClose={handleCloseForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;
