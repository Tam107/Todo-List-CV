import { useState } from 'react';

const TaskForm = ({ initialTask = {}, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initialTask.title || '');
    const [description, setDescription] = useState(initialTask.description || '');
    const [status, setStatus] = useState(initialTask.status || 'PENDING');
    const [startDate, setStartDate] = useState(initialTask.startDate || '');
    const [endDate, setEndDate] = useState(initialTask.endDate || '');
    const [error, setError] = useState( null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        if (!startDate) {
            setError('Start date is required');
            return;
        }
        if (!endDate) {
            setError('End date is required');
            return;
        }
        const task = { title, description, startDate, endDate, status };
        onSubmit(task);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
            <h3 className="text-lg font-bold mb-4">{initialTask.id ? 'Edit Task' : 'Add Task'}</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="w-full border-gray-300 rounded-md mb-2"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border-gray-300 rounded-md mb-2"
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border-gray-300 rounded-md mb-2"
            >
                <option value="PENDING">PENDING</option>
                <option value="DOING">DOING</option>
                <option value="DONE">Done</option>
            </select>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-gray-300 rounded-md mb-2"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border-gray-300 rounded-md mb-2"
            />
            <div className="flex space-x-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600"
                >
                    Save
                </button>

            </div>
        </form>
    );
};

export default TaskForm;