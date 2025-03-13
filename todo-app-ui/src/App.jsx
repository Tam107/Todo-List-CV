import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import Layout from './components/layout/Layout.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import TodoPage from './pages/todo/TodoPage.jsx';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';
import TodoForm from "./components/todo/TodoForm.jsx";
import NotFoundPage from './pages/NotFoundPage.jsx'; // Recommended to add

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected routes */}
                    <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                        {/* Root redirect */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        {/* Dashboard */}
                        <Route path="/dashboard" element={<DashboardPage />} />

                        {/* Todo Routes */}
                        <Route path="/tasks" element={<TodoPage />} />
                        <Route path="/tasks/create" element={<TodoForm mode="create" />} />
                        <Route path="/tasks/update" element={<TodoForm mode="update" />} />

                        {/* 404 Not Found */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
