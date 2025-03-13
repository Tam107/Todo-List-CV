import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Cần cài đặt jwt-decode

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Kiểm tra token còn hiệu lực không
    const isTokenValid = (token) => {
        if (!token) return false;

        try {
            const decoded = jwt_decode(token);
            // Kiểm tra thời gian hết hạn
            return decoded.exp * 1000 > Date.now();
        } catch (error) {
            console.error('Invalid token', error);
            return false;
        }
    };

    useEffect(() => {
        const initAuth = () => {
            const token = localStorage.getItem('token');

            if (token && isTokenValid(token)) {
                try {
                    const currentUser = authService.getCurrentUser();
                    setUser(currentUser);
                } catch (error) {
                    // Nếu không thể lấy user, logout
                    logout();
                }
            } else {
                // Token không hợp lệ hoặc đã hết hạn
                logout();
            }

            setLoading(false);
        };

        // Kiểm tra token mỗi khi ứng dụng khởi động
        initAuth();

        // Thiết lập interval để kiểm tra token định kỳ
        const tokenCheckInterval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (!isTokenValid(token)) {
                logout();
            }
        }, 60000); // Kiểm tra mỗi 1 phút

        // Cleanup interval khi component unmount
        return () => clearInterval(tokenCheckInterval);
    }, []);

    const login = async (credentials) => {
        try {
            // Giả sử authService.login trả về token
            const token = await authService.login(credentials);

            // Lưu token vào localStorage
            localStorage.setItem('token', token);

            // Lấy thông tin user
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);

            // Điều hướng đến trang tasks
            navigate('/tasks');
        } catch (error) {
            // Xử lý lỗi login
            console.error('Login failed', error);
            // Có thể hiển thị thông báo lỗi cho người dùng
            throw error;
        }
    };

    const logout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('token');

        // Gọi service logout nếu cần thiết
        authService.logout();

        // Reset user state
        setUser(null);

        // Điều hướng về trang login
        navigate('/login');
    };

    // Hiển thị loading khi đang kiểm tra authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng context dễ dàng
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
