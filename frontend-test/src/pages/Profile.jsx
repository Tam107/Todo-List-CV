import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import {deleteUserProfile, updateUserProfile} from "../services/userService.js";
import {logout} from "../services/authService.js";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, [])

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/users/profile`);
            const userData = response.data.data;
            console.log("user data", userData);
            setUser(userData);
            setUsername(user?.username);
            setEmail(user?.email)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch user profile");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteProfile = async () => {
        if (window.confirm("Are you sure to delete your account?")) {
            setLoading(true);
        }
        try {
            await deleteUserProfile();
            await logout();
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete user");
        } finally {
            setLoading(false);
        }
    }

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updateUserProfile({username, email});
            setUser(updatedUser);
            console.log(updatedUser);
            setEditProfile(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update user profile");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Navbar/>
            {error && (<p className={"text-red-500 mb-4"}>{error}</p>)}


            {/* Profile Card */}
            <div className="bg-white p-8 w-3/4 my-8 mx-auto  rounded-xl shadow-lg border border-gray-100 ">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
                {editProfile ? (
                    <form onSubmit={handleEditProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-blue-300"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditProfile(false)}
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all disabled:bg-gray-300"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600"><strong
                                className="text-gray-800">Username:</strong> {user?.username || 'N/A'}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600"><strong
                                className="text-gray-800">Email:</strong> {user?.email || 'N/A'}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600"><strong className="text-gray-800">Created
                                At:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <button
                            onClick={() => setEditProfile(true)}
                            className="w-fit mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>

            {/* Delete Account Card */}
            <div className="bg-white mx-auto w-3/4 p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-red-600 mb-4">Delete Your Account</h3>
                <p className="text-gray-500 mb-6">This action is permanent and cannot be undone.</p>
                <button
                    onClick={handleDeleteProfile}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all disabled:bg-red-300"
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : 'Delete Account'}
                </button>
            </div>
        </div>

    );
};

export default Profile;