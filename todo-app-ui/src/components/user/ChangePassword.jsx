import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import Button from '../common/Buton.jsx';
import Input from '../common/Input.jsx';
import Card from '../common/Card.jsx';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { changePassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            await changePassword(formData.currentPassword, formData.newPassword);
            setSuccess('Password changed successfully');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
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
                    label="Current Password"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    required
                />
                <Input
                    label="New Password"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    required
                />
                <Input
                    label="Confirm New Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                />
                <Button type="submit" isLoading={isLoading}>
                    Change Password
                </Button>
            </form>
        </Card>
    );
};

export default ChangePassword;
