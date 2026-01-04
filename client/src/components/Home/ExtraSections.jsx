import { FaBriefcase, FaMoneyBillWave, FaShieldAlt, FaUserPlus } from "react-icons/fa";

const ExtraSections = () => {
    return (
        <div className="py-24 bg-white">
            <div className="container mx-auto px-6">

                {/* How it works */}
                <section className="mb-32">
                    <div className="text-center mb-20">
                        <div className="inline-block px-6 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-black mb-6 border border-emerald-100 uppercase tracking-[0.2em]">
                            ⚙️ How it works
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight px-4">How MicroTask Works</h2>
                        <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                            Get started in minutes with our simple and secure process <br className="hidden md:block" /> designed for both workers and buyers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-0"></div>

                        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:scale-[1.05] transition-all text-center relative z-10 group border border-slate-50">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto mb-8 shadow-xl transform group-hover:rotate-12 transition-transform">1</div>
                            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-600 text-3xl border border-emerald-100 group-hover:scale-110 transition-transform">
                                <FaUserPlus />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">Create Account</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Sign up in seconds and verify your profile to start your journey.</p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:scale-[1.05] transition-all text-center relative z-10 group border border-slate-50">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto mb-8 shadow-xl transform group-hover:rotate-12 transition-transform">2</div>
                            <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-blue-600 text-3xl border border-blue-100 group-hover:scale-110 transition-transform">
                                <FaBriefcase />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">Post or Find Tasks</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Whether you're a buyer or worker, find tasks that match your needs.</p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:scale-[1.05] transition-all text-center relative z-10 group border border-slate-50">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto mb-8 shadow-xl transform group-hover:rotate-12 transition-transform">3</div>
                            <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-orange-600 text-3xl border border-orange-100 group-hover:scale-110 transition-transform">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">Review & Approve</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Review submitted proof to ensure quality before releasing coins.</p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:scale-[1.05] transition-all text-center relative z-10 group border border-slate-50">
                            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto mb-8 shadow-xl transform group-hover:scale-110 transition-transform">4</div>
                            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-600 text-3xl border border-emerald-100 group-hover:scale-110 transition-transform">
                                <FaMoneyBillWave />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">Earn or Withdraw</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Get paid for your hard work or withdraw your funds instantly.</p>
                        </div>
                    </div>
                </section>

                {/* Platform Features / Why Choose Us */}
                <section>
                    <div className="text-center mb-20">
                        <div className="inline-block px-6 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-black mb-6 border border-emerald-100 uppercase tracking-[0.2em]">
                            🚀 Why Choose Us
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight px-4">Platform Features</h2>
                        <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                            We provide a safe, scalable, and efficient environment <br className="hidden md:block" /> for the modern micro-tasking economy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Transparent Pricing', desc: 'No hidden fees. You know exactly what you pay or earn for every task.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', bg: 'bg-emerald-50', color: 'text-emerald-600' },
                            { title: 'Work In Any Category', desc: 'Choose from a wide variety of tasks that match your specific skill set.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Mobile Friendly Platform', desc: 'Complete tasks on the go using our fully responsive web platform.', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', bg: 'bg-orange-50', color: 'text-orange-600' },
                            { title: 'Secure Payments', desc: 'Your earnings are guarded by industry-leading security protocols.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', bg: 'bg-emerald-50', color: 'text-emerald-600' },
                            { title: 'Quick Turnaround', desc: 'Get your tasks completed faster than ever with our active community.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Supportive Community', desc: 'Join a global network of buyers and workers helping each other grow.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', bg: 'bg-orange-50', color: 'text-orange-600' }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group border border-slate-50">
                                <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExtraSections;
