import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import Button from '../common/Button';
import Card from '../common/Card';

const DeleteAccount = () => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { deleteAccount, logout } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        setIsLoading(true);
        setError('');

        try {
            await deleteAccount();
            logout();
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete account');
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-red-600 mb-6">Delete Account</h2>
            <p className="text-gray-600 mb-4">
                Warning: This action cannot be undone. All your data will be permanently deleted.
            </p>
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}
            {!isConfirmOpen ? (
                <Button
                    variant="danger"
                    onClick={() => setIsConfirmOpen(true)}
                >
                    Delete Account
                </Button>
            ) : (
                <div className="space-y-4">
                    <p className="font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </p>
                    <div className="flex space-x-3">
                        <Button
                            variant="danger"
                            isLoading={isLoading}
                            onClick={handleDelete}
                        >
                            Yes, Delete My Account
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setIsConfirmOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default DeleteAccount;
