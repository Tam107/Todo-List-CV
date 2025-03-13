import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Trang bạn tìm kiếm không tồn tại</p>
            <div className="flex space-x-4">
                {/*<Link*/}
                {/*    to="/"*/}
                {/*    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"*/}
                {/*>*/}
                {/*    Back home*/}
                {/*</Link>*/}
                <Link
                    to="/tasks"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    List Tasks
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
