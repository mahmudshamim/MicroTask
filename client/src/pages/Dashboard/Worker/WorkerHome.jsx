import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaList, FaTasks, FaMoneyBill } from "react-icons/fa";

const WorkerHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['worker-submissions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/submissions?email=${user?.email}`);
            return res.data;
        }
    });

    const totalSubmissions = submissions.length;
    const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
    const approvedSubmissions = submissions.filter(s => s.status === 'approved');
    const totalEarnings = approvedSubmissions.reduce((acc, sub) => acc + (sub.payable_amount || 0), 0);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">My Performance</h2>
                    <p className="text-gray-500 mt-2">Track your earnings and submission status.</p>
                </div>
                <div className="bg-[#1e293b]/50 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-gray-200">Service Status: Online</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { title: 'Total Submissions', value: totalSubmissions, label: 'All time', icon: <FaList />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                    { title: 'Pending Review', value: pendingSubmissions, label: 'In queue', icon: <FaTasks />, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                    { title: 'Total Earnings', value: `$${(totalEarnings / 20).toFixed(2)}`, label: `${totalEarnings} coins`, icon: <FaMoneyBill />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
                ].map((stat, i) => (
                    <div key={i} className={`bg-white/5 backdrop-blur-xl p-6 rounded-3xl border ${stat.border} hover:bg-white/10 transition-all group`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</span>
                        </div>
                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{stat.title}</p>
                        <h4 className="text-3xl font-black text-white mt-1">{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="bg-[#1e293b]/50 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Approved Submissions</h3>
                    <button className="text-accent text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full text-gray-300">
                        <thead className="bg-white/5">
                            <tr className="text-gray-400 text-xs uppercase tracking-wider border-none">
                                <th className="py-4 px-8">Task Title</th>
                                <th className="py-4">Payable</th>
                                <th className="py-4">Buyer</th>
                                <th className="py-4 px-8 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {approvedSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-20 text-gray-400 font-medium">No approved submissions yet</td>
                                </tr>
                            ) : (
                                approvedSubmissions.map(sub => (
                                    <tr key={sub._id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-5 px-8 font-semibold text-white">{sub.task_title}</td>
                                        <td className="py-5 font-bold text-emerald-400">{sub.payable_amount} Coins</td>
                                        <td className="py-5 text-gray-400">{sub.buyer_name}</td>
                                        <td className="py-5 px-8 text-right">
                                            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                                {sub.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;
