import  { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            navigate('/tasks');
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
            console.log("Error with login: ", error.response?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                {error && (
                    <p className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {/* Forgot Password Link */}
                    <div className="flex justify-end mt-2">
                        <Link className="text-sm text-blue-500 hover:underline" to="/change-password">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Register Section */}
                    <div className="flex justify-center mt-4 p-3 bg-gray-100 rounded-lg shadow-sm">
                        <p className="text-gray-600">
                            Do not have an account?
                            <Link className="ml-1 text-blue-600 font-medium hover:underline" to="/register">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
