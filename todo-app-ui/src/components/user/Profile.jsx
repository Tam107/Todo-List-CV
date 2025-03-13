import { useState, useEffect } from 'react';
import { userService } from '../../services/user.service';
import Button from '../common/Buton.jsx';
import Input from '../common/Input.jsx';
import Card from '../common/Card.jsx';
import { handleApiError } from '../../utils/helpers';

const Profile = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const userData = await userService.getProfile();
            setFormData({
                username: userData.username,
                email: userData.email,
            });
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            await userService.updateProfile(formData);
            setSuccess('Profile updated successfully');
            // Refresh profile data
            await fetchUserProfile();
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <Card>
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    disabled={isLoading}
                    placeholder="Enter your username"
                />
                <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                    placeholder="Enter your email"
                />
                <div className="flex items-center justify-end space-x-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setFormData({
                            username: formData.username,
                            email: formData.email
                        })}
                        disabled={isLoading}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Profile;
