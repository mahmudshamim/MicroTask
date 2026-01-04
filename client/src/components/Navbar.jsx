import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaClipboardCheck, FaGithub } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { userData } = useUser();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);



    return (
        <nav className="bg-[#0a1122]/95 backdrop-blur-xl text-white border-b border-white/5 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-5">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 text-xl font-black tracking-tighter">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-primary/20">
                            <FaClipboardCheck className="text-lg" />
                        </div>
                        <span className="text-white">MicroTask</span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-8 font-bold">
                        {
                            user ? <>
                                <li>
                                    <span className="text-primary font-black flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                        {userData?.coins || 0} Coins
                                    </span>
                                </li>
                                <li><Link to="/dashboard" className="px-5 py-2 hover:bg-white/5 rounded-xl transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                                <li>
                                    <button onClick={() => { handleLogOut(); setIsMenuOpen(false); }} className="px-5 py-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">LogOut</button>
                                </li>
                                <li className="hidden lg:block">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary shadow-lg shadow-primary/10">
                                        <img src={user?.photoURL} alt={user?.displayName} className="w-full h-full object-cover" />
                                    </div>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/mahmudshamim"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 border border-white/10 text-slate-300 hover:bg-white/5 font-bold rounded-xl transition-all flex items-center gap-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaGithub className="text-lg" />
                                        Join as Developer
                                    </a>
                                </li>
                            </> : <>
                                <li><Link to="/login" className="px-6 py-2 text-slate-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                                <li><Link to="/register" className="px-8 py-2.5 bg-primary hover:bg-emerald-500 text-white rounded-xl transition-all shadow-xl shadow-primary/20" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
                                <li>
                                    <a
                                        href="https://github.com/mahmudshamim"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2.5 border border-white/10 text-slate-300 hover:bg-white/5 rounded-xl transition-all flex items-center gap-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaGithub className="text-lg" />
                                        Join as Developer
                                    </a>
                                </li>
                            </>
                        }
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-2xl focus:outline-none bg-white/5 p-2 rounded-xl border border-white/5"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-white/5 pt-4 animate-fadeIn">
                        <ul className="flex flex-col gap-4 font-bold text-center">
                            {
                                user ? <>
                                    <li><Link to="/dashboard" className="px-5 py-2 block hover:bg-white/5 rounded-xl transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                                    <li><button onClick={() => { handleLogOut(); setIsMenuOpen(false); }} className="px-5 py-2 block w-full text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">LogOut</button></li>
                                    <li>
                                        <a
                                            href="https://github.com/mahmudshamim"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 border border-white/10 text-slate-300 hover:bg-white/5 rounded-xl transition-all flex items-center justify-center gap-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <FaGithub className="text-lg" />
                                            Join as Developer
                                        </a>
                                    </li>
                                </> : <>
                                    <li><Link to="/login" className="px-5 py-2 block hover:bg-white/5 rounded-xl transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                                    <li><Link to="/register" className="px-5 py-3 block bg-primary text-white rounded-xl transition-colors" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
                                    <li>
                                        <a
                                            href="https://github.com/mahmudshamim"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 border border-white/10 text-slate-300 hover:bg-white/5 rounded-xl transition-all flex items-center justify-center gap-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <FaGithub className="text-lg" />
                                            Join as Developer
                                        </a>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
