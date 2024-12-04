

// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, BarChart, Bar, Legend } from 'recharts';
// import axiosInstance from "../../utils/axiosInstance";
// import 'tailwindcss/tailwind.css';

// const DeliveryPartnerStats = () => {
//     const [stats, setStats] = useState(null);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const response = await axiosInstance.get('deliveryPartner/stats');
//                 setStats(response.data);
//             } catch (error) {
//                 console.error('Error fetching stats:', error);
//             }
//         };

//         fetchStats();
//     }, []);

//     if (!stats) return <div className="text-center text-xl text-gray-500">Loading...</div>;

//     const dailyOrdersData = stats.dailyOrders.map((orders, index) => ({
//         day: index + 1,
//         orders: orders || 0
//     }));

//     const dailyRevenueData = stats.dailyRevenue.map((revenue, index) => ({
//         day: index + 1,
//         revenue: revenue || 0
//     }));

//     const statusDistributionData = ['pending', 'accepted', 'completed'].map(status => ({
//         name: status,
//         value: stats.statusDistribution[status] || 0
//     }));

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold text-center mb-6">Delivery Partner Stats</h2>
            
//             <div className="grid grid-cols-2 gap-6 mb-12">
//                 <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-center mb-4">Daily Orders</h3>
//                     <LineChart width={500} height={300} data={dailyOrdersData} className="mx-auto">
//                         <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//                         <XAxis dataKey="day" label={{ value: 'Day of Month', position: 'insideBottomRight', offset: -5 }} />
//                         <YAxis label={{ value: 'Orders', angle: -90, position: 'insideLeft' }} />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={3} />
//                     </LineChart>
//                     <p className="text-center text-gray-600 mt-4">This chart shows the number of orders placed each day of the month.</p>
//                 </div>

//                 <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-center mb-4">Daily Revenue</h3>
//                     <LineChart width={500} height={300} data={dailyRevenueData} className="mx-auto">
//                         <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//                         <XAxis dataKey="day" label={{ value: 'Day of Month', position: 'insideBottomRight', offset: -5 }} />
//                         <YAxis label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }} />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
//                     </LineChart>
//                     <p className="text-center text-gray-600 mt-4">This chart shows the total revenue generated each day of the month.</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-2 gap-6 mb-12">
//                 <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-center mb-4">Order Status Distribution</h3>
//                     <PieChart width={400} height={400} className="mx-auto">
//                         <Pie 
//                             data={statusDistributionData} 
//                             dataKey="value" 
//                             nameKey="name" 
//                             cx="50%" 
//                             cy="50%" 
//                             outerRadius={150} 
//                             fill="#8884d8" 
//                             label 
//                         />
//                         <Tooltip />
//                     </PieChart>
//                     <p className="text-center text-gray-600 mt-4">This chart shows the distribution of order statuses.</p>
//                 </div>

//                 <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//                     <h3 className="text-xl font-semibold text-center mb-4">Status Distribution Bar Chart</h3>
//                     <BarChart width={500} height={300} data={statusDistributionData} className="mx-auto">
//                         <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//                         <XAxis dataKey="name" label={{ value: 'Status', position: 'insideBottomRight', offset: -5 }} />
//                         <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="value" fill="#8884d8" />
//                     </BarChart>
//                     <p className="text-center text-gray-600 mt-4">This chart shows the count of each order status.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DeliveryPartnerStats;


import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, BarChart, Bar, Legend, ResponsiveContainer, Cell } from 'recharts';
import axiosInstance from "../../utils/axiosInstance";
import 'tailwindcss/tailwind.css';

const DeliveryPartnerStats = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const CHART_COLORS = {
        primary: '#6366f1',      // Indigo
        secondary: '#ec4899',    // Pink
        tertiary: '#8b5cf6',    // Purple
        success: '#22c55e',     // Green
        background: '#f8fafc',   // Light gray
        orange: '#FFA500',   // Light gray
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosInstance.get('deliveryPartner/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
            </div>
        );
    }

    if (!stats) return (
        <div className="text-center p-8">
            <p className="text-xl text-gray-600">Failed to load statistics</p>
            <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
                Retry
            </button>
        </div>
    );

    const dailyOrdersData = stats.dailyOrders.map((orders, index) => ({
        day: index + 1,
        orders: orders || 0
    }));

    const dailyRevenueData = stats.dailyRevenue.map((revenue, index) => ({
        day: index + 1,
        revenue: revenue || 0
    }));

    const statusDistributionData = ['pending', 'accepted', 'completed'].map(status => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: stats.statusDistribution[status] || 0
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{`Day ${label}`}</p>
                    <p className="text-indigo-600">{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-orange-600 mb-2">Delivery Partner Analytics</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Daily Orders Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-orange-600 mb-6">Daily Orders Timeline</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyOrdersData}>
                                <defs>
                                    <linearGradient id="orderColorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis 
                                    dataKey="day" 
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b' }}
                                />
                                <YAxis 
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line 
                                    type="monotone" 
                                    dataKey="orders" 
                                    stroke={CHART_COLORS.primary}
                                    strokeWidth={3}
                                    dot={{ fill: CHART_COLORS.primary }}
                                    activeDot={{ r: 8 }}
                                    fill="url(#orderColorGradient)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Daily Revenue Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-orange-600 mb-6">Revenue Analysis</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyRevenueData}>
                                <defs>
                                    <linearGradient id="revenueColorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis 
                                    dataKey="day" 
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b' }}
                                />
                                <YAxis 
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke={CHART_COLORS.success}
                                    strokeWidth={3}
                                    dot={{ fill: CHART_COLORS.success }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Order Status Distribution */}
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-orange-600 mb-6">Order Status Distribution</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusDistributionData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill={CHART_COLORS.tertiary}
                                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {statusDistributionData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`}
                                            fill={[CHART_COLORS.orange, CHART_COLORS.success, CHART_COLORS.primary][index]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Bar Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-orange-600 mb-6">Status Comparison</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusDistributionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b' }}
                                />
                                <YAxis 
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar 
                                    dataKey="value" 
                                    fill={CHART_COLORS.tertiary}
                                    radius={[4, 4, 0, 0]}
                                >
                                    {statusDistributionData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`}
                                            fill={[CHART_COLORS.orange, CHART_COLORS.success, CHART_COLORS.primary][index]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPartnerStats;