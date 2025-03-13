import Profile from '../../components/user/Profile.jsx';
import ChangePassword from '../../components/user/ChangePassword.jsx';
import DeleteAccount from '../../components/user/DeleteAccount.jsx';

const ProfilePage = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>

            <div className="space-y-8">
                <Profile />
                <ChangePassword />
                <DeleteAccount />
            </div>
        </div>
    );
};

export default ProfilePage;
