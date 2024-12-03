import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const RestaurantDetails = () => {
    const { restaurantId } = useParams();
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await axiosInstance.get(`/admin/${restaurantId}/analytics`);
                setAnalytics(response.data);
            } catch (err) {
                setError('Failed to fetch analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [restaurantId]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Restaurant Analytics</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Hello</h1>
                    console.log('Analytics Data:', analytics);
                    <p className="text-xl font-semibold mb-4">Today's Profit: ${analytics.dailyBalance * 0.1}</p>
                    <p className="text-xl font-semibold mb-4">Total Orders Today: {analytics.dailyOrders}</p>
                    <p className="text-xl font-semibold mb-4">Weekly Profit: ${analytics.weeklyBalance * 0.1}</p>
                    <p className="text-xl font-semibold mb-4">Total Orders This Week: {analytics.weeklyOrders}</p>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;