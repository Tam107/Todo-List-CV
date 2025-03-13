import React from 'react';
import {
    CheckCircle2Icon,
    ClockIcon,
    AlertTriangleIcon,
    EditIcon,
    TrashIcon
} from 'lucide-react';

const statusColors = {
    PENDING: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        icon: 'text-blue-500'
    },
    DOING: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-200',
        icon: 'text-yellow-500'
    },
    DONE: {
        bg: 'bg-white',
        text: 'text-green-600',
        border: 'border-green-200',
        icon: 'text-green-500'
    }
};

const TodoItem = ({ todo, onDelete, onEdit }) => {
    // Kiểm tra và gán giá trị mặc định
    const status = todo?.status || 'TODO';

    // Lấy màu sắc an toàn
    const statusColor = statusColors[status] || statusColors.TODO;

    // Format ngày
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    // Chọn icon status
    const getStatusIcon = () => {
        switch(status) {
            case 'DONE':
                return <CheckCircle2Icon className={`w-5 h-5 ${statusColor.icon}`} />;
            case 'DOING':
                return <ClockIcon className={`w-5 h-5 ${statusColor.icon}`} />;
            default:
                return <AlertTriangleIcon className={`w-5 h-5 ${statusColor.icon}`} />;
        }
    };

    return (
        <div
            className={`
              ${statusColor.bg} 
              ${statusColor.border} 
              border rounded-lg p-4 flex items-center 
              justify-between hover:shadow-md transition-all 
              duration-300 mb-2
          `}
        >
            <div className="flex items-center space-x-4 flex-1">
                {/* Status Icon */}
                <div>{getStatusIcon()}</div>

                {/* Task Details */}
                <div className="flex-1">
                    <h3 className={`
                      font-semibold text-lg 
                      ${statusColor.text}
                  `}>
                        {todo?.title || 'Untitled Task'}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {todo?.description || 'No description'}
                    </p>
                </div>

                {/* Dates */}
                <div className="flex space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{formatDate(todo?.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <AlertTriangleIcon className="w-4 h-4" />
                        <span>{formatDate(todo?.endDate)}</span>
                    </div>
                </div>

                {/* Status Tag */}
                <div
                    className={`
                      ${statusColor.bg} 
                      ${statusColor.text} 
                      ${statusColor.border} 
                      px-2 py-1 rounded-full text-xs font-medium
                      border
                  `}
                >
                    {status.replace('_', ' ')}
                </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 ml-4">
                <button
                    onClick={onEdit}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                >
                    <EditIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
