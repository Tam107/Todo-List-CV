import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import {
    LockClosedIcon,
    UserIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import Button from '../common/Buton.jsx';
import Input from '../common/Input.jsx';
import Card from '../common/Card.jsx';
import { validateEmail, validatePassword, handleApiError } from '../../utils/helpers';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        // Validate email
        if (!validateEmail(formData.email)) {
            setErrors((prev) => ({
                ...prev,
                email: 'Please enter a valid email address.',
            }));
            return;
        }

        // Validate password strength
        if (!validatePassword(formData.password)) {
            setErrors((prev) => ({
                ...prev,
                password:
                    'Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special characters.',
            }));
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: 'Passwords do not match.',
            }));
            return;
        }

        setIsLoading(true);
        try {
            await register(formData.username, formData.email, formData.password);
            navigate('/login');
        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                form: handleApiError(err),
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card>
                    {errors.form && (
                        <div className="mb-4 flex items-center bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                            <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                            <span className="block sm:inline">{errors.form}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                            error={errors.username}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                            error={errors.password}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                            error={errors.confirmPassword}
                            required
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterForm;