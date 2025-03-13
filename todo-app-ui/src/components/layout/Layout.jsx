import { Outlet } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
