import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import Tasks from './pages/Tasks';
// import Profile from './pages/Profile';
import { isAuthenticated } from './services/authService';

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            {/*<Tasks />*/}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            {/*<Profile />*/}
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;