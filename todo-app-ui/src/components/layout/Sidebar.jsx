import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    CheckSquareIcon,
    UserIcon,
    SettingsIcon
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Tasks', href: '/tasks', icon: CheckSquareIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <span className="text-2xl font-bold text-white">TodoApp</span>
                    </div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }
                  `}
                                >
                                    <Icon
                                        className={`
                      mr-3 flex-shrink-0 h-6 w-6
                      ${isActive
                                            ? 'text-gray-300'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                        }
                    `}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
