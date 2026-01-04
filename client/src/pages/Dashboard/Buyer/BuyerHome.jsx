import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaTasks, FaUsers, FaMoneyBill, FaList } from "react-icons/fa";

const BuyerHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: stats = { taskCount: 0, totalPendingWorkers: 0, totalPayment: 0 } } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/buyer-stats/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h2 className="text-3xl font-bold text-white">Buyer Overview</h2>
                <p className="text-gray-500 mt-2">Manage your tasks and review worker progress.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { title: 'Jobs Posted', value: stats.taskCount, label: 'Active & Closed', icon: <FaTasks />, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
                    { title: 'Required Workers', value: stats.totalPendingWorkers, label: 'Pending completion', icon: <FaUsers />, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
                    { title: 'Total Investment', value: `$${stats.totalPayment}`, label: 'Via Payments', icon: <FaMoneyBill />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
                ].map((stat, i) => (
                    <div key={i} className={`bg-white/5 backdrop-blur-xl p-7 rounded-3xl border ${stat.border} hover:bg-white/10 transition-all group`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</span>
                        </div>
                        <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider">{stat.title}</p>
                        <h4 className="text-3xl font-black text-white mt-2">{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#1e293b]/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-2xl bg-accent/5 text-accent border border-accent/10 hover:bg-accent/10 transition-colors flex flex-col items-center gap-2">
                            <FaTasks className="text-xl" />
                            <span className="text-sm font-bold">New Task</span>
                        </button>
                        <button className="p-4 rounded-2xl bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 transition-colors flex flex-col items-center gap-2">
                            <FaMoneyBill className="text-xl" />
                            <span className="text-sm font-bold">Buy Coins</span>
                        </button>
                    </div>
                </div>
                <div className="bg-[#1e293b]/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex items-center justify-center text-center">
                    <div>
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaList className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-sm">Task distribution chart planned...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerHome;
