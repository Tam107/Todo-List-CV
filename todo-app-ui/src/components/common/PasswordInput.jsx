import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import PropTypes from "prop-types";

const PasswordInput = ({
                           label,
                           name,
                           value,
                           onChange,
                           placeholder = 'Enter your password',
                           required = false,
                           className = '',
                           autoComplete = 'current-password'
                       }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                </button>
            </div>
            {/* Optional: Password strength indicator */}
            {value && (
                <div className="mt-1 h-1 w-full bg-gray-200 rounded">
                    <div
                        className={`h-1 rounded transition-all duration-300 ease-in-out ${
                            value.length < 6
                                ? 'bg-red-500 w-1/4'
                                : value.length < 10
                                    ? 'bg-yellow-500 w-1/2'
                                    : 'bg-green-500 w-full'
                        }`}
                    />
                </div>
            )}
        </div>
    );
};

// Prop Types (optional but recommended)
PasswordInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    autoComplete: PropTypes.string
};

export default PasswordInput;
