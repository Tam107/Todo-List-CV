import {useState, useEffect} from 'react';
import {todoService} from '../../services/todo.service';
import {handleApiError} from '../../utils/helpers';
import Button from '../common/Buton.jsx';
import Input from '../common/Input.jsx';
import {SaveIcon} from 'lucide-react';

const TodoForm = ({initialData, onClose}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        status: 'TODO',
        priority: 'MEDIUM'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Populate form with initial data when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                startDate: initialData.startDate || new Date().toISOString().split('T')[0],
                endDate: initialData.endDate || new Date().toISOString().split('T')[0],
                status: initialData.status || 'PENDING',
                priority: initialData.priority || 'MEDIUM'
            });
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Validate dates
            if (new Date(formData.startDate) > new Date(formData.endDate)) {
                setError('End date must be after start date');
                setIsLoading(false);
                return;
            }

            if (initialData) {
                // Edit existing task
                await todoService.updateTask(initialData.id, formData);
            } else {
                // Create new task
                await todoService.createTask(formData);
            }

            // Close the form
            onClose();
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">
                {initialData ? 'Edit Task' : 'Create New Task'}
            </h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Input
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Enter task description..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Input
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            label="End Date"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="PENDING">To Do</option>
                            <option value="DOING">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                            <SaveIcon className="w-4 h-4 mr-2"/>
                        )}
                        {initialData ? 'Update Task' : 'Create Task'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
