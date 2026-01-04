const TrustStats = () => {
    const stats = [
        { label: 'Active Users', value: '50,000+', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { label: 'Tasks Completed', value: '1.2M+', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { label: 'Total Paid Out', value: '$2.5M+', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V15' },
        { label: 'Satisfaction Rate', value: '98%', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
    ];

    return (
        <section className="py-24 bg-base-200 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-block px-6 py-2 rounded-xl bg-emerald-500/10 text-primary text-xs font-black mb-6 border border-emerald-500/20 uppercase tracking-[0.2em]">
                    📊 Statistics
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Trusted by Thousands</h2>
                <p className="text-gray-400 text-xl font-medium mb-20 max-w-2xl mx-auto">
                    We deliver quality and reliability at scale, powering <br className="hidden md:block" /> the micro-tasking economy for people worldwide.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 hover:bg-white/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mx-auto mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                </svg>
                            </div>
                            <h3 className="text-4xl font-black text-white mb-3 tracking-tight">{stat.value}</h3>
                            <p className="text-emerald-500 text-sm font-black uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustStats;
