import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BestWorkers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: bestWorkers = [], isLoading, isError, error } = useQuery({
        queryKey: ['bestWorkers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/best-workers');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20 text-gray-400">Loading top performers...</div>
    if (isError) return (
        <div className="text-center py-10 px-4">
            <div className="text-red-500 font-bold mb-2">Failed to load data</div>
            <p className="text-sm text-gray-500 mb-4">{error.message}</p>
            <p className="text-xs bg-gray-100 inline-block px-3 py-1 rounded">
                Please check your internet connection or try again later.
            </p>
        </div>
    )

    // Calculate max coins for progress bar
    const maxCoins = bestWorkers.length > 0 ? Math.max(...bestWorkers.map(w => w.coins)) : 0;

    const getRankColor = (rank) => {
        if (rank === 0) return "bg-yellow-400 text-white"; // Gold
        if (rank === 1) return "bg-gray-300 text-gray-700"; // Silver
        if (rank === 2) return "bg-orange-300 text-white"; // Bronze
        return "bg-gray-100 text-gray-500";
    };

    return (
        <div className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-black mb-8 border border-emerald-100 uppercase tracking-[0.2em]">
                        💎 Top Performers
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight px-4">Best Workers This Month</h2>
                    <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                        Join our top-performing workers who earn the most through their dedication and <br className="hidden lg:block" /> quality work on the platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        bestWorkers.map((worker, idx) => {
                            const progress = maxCoins > 0 ? (worker.coins / maxCoins) * 100 : 0;

                            return (
                                <div key={worker._id} className="relative bg-white rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-all duration-500 group border border-slate-50">
                                    {/* Rank Badge */}
                                    <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white shadow-xl ${getRankColor(idx)} border-4 border-white transform rotate-6 group-hover:rotate-0 transition-transform`}>
                                        {idx + 1}
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-slate-50 shadow-inner">
                                                <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-[10px] shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-slate-900 mb-1">{worker.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-emerald-600 font-black text-xl">{worker.coins.toLocaleString()}</span>
                                                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Coins</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-50">
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default BestWorkers;
