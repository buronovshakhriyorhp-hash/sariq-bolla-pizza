import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock, Search, TrendingUp, DollarSign } from 'lucide-react';

const MOCK_ORDERS = [
    { id: 1739031200000, customer: "Azizbek", total: "185,000", status: "Yangi", items: 3, time: "5 daqiqa oldin" },
    { id: 1739030000000, customer: "Malika", total: "65,000", status: "Tayyorlanmoqda", items: 1, time: "15 daqiqa oldin" },
    { id: 1739029000000, customer: "Jamshid", total: "120,000", status: "Yetkazilmoqda", items: 2, time: "30 daqiqa oldin" },
    { id: 1739025000000, customer: "Sardor", total: "250,000", status: "Yetkazildi", items: 5, time: "1 soat oldin" },
];

const AdminDashboard = () => {
    const [orders] = useState(MOCK_ORDERS);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Yangi': return 'bg-blue-100 text-blue-700';
            case 'Tayyorlanmoqda': return 'bg-yellow-100 text-yellow-700';
            case 'Yetkazilmoqda': return 'bg-orange-100 text-orange-700';
            case 'Yetkazildi': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                        <p className="text-gray-500">Bugungi buyurtmalar statistikasi</p>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-sm flex items-center">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" className="w-10 h-10 rounded-full mr-3" alt="Admin" />
                        <div>
                            <p className="font-bold text-sm">Manager</p>
                            <p className="text-xs text-green-500 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Online</p>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Package size={24} />
                            </div>
                            <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                                <TrendingUp size={14} /> +12%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Jami Buyurtmalar</h3>
                        <p className="text-3xl font-bold text-gray-900">24</p>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                <DollarSign size={24} />
                            </div>
                            <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                                <TrendingUp size={14} /> +8%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Bugungi Savdo</h3>
                        <p className="text-3xl font-bold text-gray-900">2,450,000 so'm</p>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                <Clock size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">O'rtacha Yetkazish Vaqti</h3>
                        <p className="text-3xl font-bold text-gray-900">32 daq</p>
                    </motion.div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Faol Buyurtmalar</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Qidirish..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-bold">ID Raqam</th>
                                    <th className="px-6 py-4 font-bold">Mijoz</th>
                                    <th className="px-6 py-4 font-bold">Summa</th>
                                    <th className="px-6 py-4 font-bold">Holat</th>
                                    <th className="px-6 py-4 font-bold">Vaqt</th>
                                    <th className="px-6 py-4 font-bold">Amallar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm">#{order.id.toString().slice(-6)}</td>
                                        <td className="px-6 py-4 font-medium">{order.customer}</td>
                                        <td className="px-6 py-4">{order.total} so'm</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{order.time}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-gray-400 hover:text-black transition-colors">
                                                To'liq ko'rish
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
