import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaUsers, FaUser, FaMoneyBill, FaList } from "react-icons/fa";

const AdminHome = () => {
    const axiosPublic = useAxiosPublic();

    const { data: stats = { totalWorkers: 0, totalBuyers: 0, totalCoins: 0, totalPayments: 0 }, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h2 className="text-3xl font-bold text-white">Platform Overview</h2>
                <p className="text-gray-500 mt-2">Manage users, tasks, and monitor platform performance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Workers', value: stats.totalWorkers, icon: <FaUsers />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                    { title: 'Total Buyers', value: stats.totalBuyers, icon: <FaUser />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                    { title: 'Total Coins', value: stats.totalCoins, icon: <FaMoneyBill />, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                    { title: 'Total Payments', value: `$${stats.totalPayments.toFixed(2)}`, icon: <FaList />, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' }
                ].map((stat, i) => (
                    <div key={i} className={`bg-white/5 backdrop-blur-xl p-6 rounded-3xl border ${stat.border} hover:bg-white/10 transition-all group`}>
                        <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 text-2xl transition-transform group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{stat.title}</p>
                        <h4 className="text-3xl font-black text-white mt-1">{stat.value}</h4>
                    </div>
                ))}
            </div>

            {/* Quick Actions or more stats could go here */}
            <div className="bg-[#1e293b]/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaList className="text-gray-300" />
                    </div>
                    <p className="text-gray-400">Activity monitor coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

