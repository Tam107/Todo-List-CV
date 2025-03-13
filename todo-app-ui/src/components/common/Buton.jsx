import React from 'react';
import { classNames } from '../../utils/helpers';

// Định nghĩa các variants cho button
const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
};

// Định nghĩa các kích thước
const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

const Button = ({
                    children,
                    type = 'button',
                    className = '',
                    variant = 'primary',
                    size = 'md',
                    disabled = false,
                    isLoading = false,
                    ...props
                }) => {
    // Loại bỏ isLoading từ props trước khi pass xuống button element
    const { isLoading: _, ...buttonProps } = props;

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={classNames(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                variants[variant],
                sizes[size],
                (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
                className
            )}
            {...buttonProps}
        >
            {isLoading ? (
                <>
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
