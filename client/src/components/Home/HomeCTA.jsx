import { Link } from "react-router-dom";

const HomeCTA = () => {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="bg-[#0f172a] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/20 rounded-full blur-[150px] -z-0 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[30%] h-[100%] bg-blue-500/10 rounded-full blur-[100px] -z-0 pointer-events-none"></div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-primary/10 text-primary text-xs font-black border border-primary/20 uppercase tracking-[0.2em]">
                            ✨ Join Now
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                            Ready to Start <br />
                            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Earning?</span>
                        </h2>

                        <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed">
                            Join thousands of workers who work on projects you care about. <br className="hidden md:block" />
                            Sign up and join the community today.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                            <Link to="/register" className="px-12 py-5 bg-primary hover:bg-emerald-500 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-primary/30 text-xl">
                                Get Started Free
                            </Link>
                            <Link to="/login" className="px-12 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black rounded-2xl transition-all text-xl">
                                Already a Member?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeCTA;
