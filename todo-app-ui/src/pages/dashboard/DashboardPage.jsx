import { useEffect, useState } from 'react';
import { todoService } from '../../services/todo.service';
import Card from '../../components/common/Card.jsx';
import Loading from '../../components/common/Loading.jsx';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await todoService.getStats();
                setStats(data);
            } catch (err) {
                setError('Failed to load dashboard stats');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) return <Loading />;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
                    <p className="mt-2 text-3xl font-bold text-primary-600">
                        {stats.totalTasks}
                    </p>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium text-gray-900">Completed Tasks</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {stats.completedTasks}
                    </p>
                </Card>

                <Card>
                    <h3 className="text-lg font-medium text-gray-900">Pending Tasks</h3>
                    <p className="mt-2 text-3xl font-bold text-yellow-600">
                        {stats.pendingTasks}
                    </p>
                </Card>
            </div>

            {/* Add more dashboard widgets here */}
        </div>
    );
};

export default DashboardPage;
