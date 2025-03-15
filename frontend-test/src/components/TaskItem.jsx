// src/components/TaskItem.jsx
import { Button } from '@headlessui/react';

// Utility function to format ISO date to YYYY-MM-DD
const formatDate = (isoDate) => {
    if (!isoDate) return 'Not set'; // Handle null or undefined
    const date = new Date(isoDate);
    if (isNaN(date)) return 'Invalid date'; // Handle invalid dates
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
};

const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
        <div className="w-full flex justify-between items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition duration-300">
            <div className="space-y-1">
                <h3 className="text-base font-semibold text-indigo-600">{task.title}</h3>
                <p className="text-gray-700 text-sm truncate">{task.description || 'No description'}</p>
                <div className="flex space-x-4 text-xs text-gray-600">
                    <p>Status: <span className="text-indigo-500 font-medium">{task.status}</span></p>
                    <p>Start: <span className="font-medium">{formatDate(task.startDate)}</span></p>
                    <p>End: <span className="font-medium">{formatDate(task.endDate)}</span></p>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button
                    onClick={() => onEdit(task)}
                    className="inline-flex items-center rounded-md bg-indigo-500 px-2 py-1 text-xs font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => onDelete(task.id)}
                    className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default TaskItem;