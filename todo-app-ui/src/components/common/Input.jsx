import React from 'react';
import { classNames } from '../../utils/helpers';

const Input = ({
                   label,
                   error,
                   icon,
                   className = '',
                   ...props
               }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    className={classNames(
                        'w-full rounded-md border-gray-300 shadow-sm pl-10',
                        'focus:border-primary-500 focus:ring-primary-500',
                        error && 'border-red-500',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;