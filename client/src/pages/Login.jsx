import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import SocialLogin from "../components/SocialLogin";
import Swal from 'sweetalert2';
import { FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'Welcome back to MicroTask',
                    icon: 'success',
                    confirmButtonColor: '#10B981',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#EF4444',
                });
            })
    }

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-400">Access your dashboard to continue your tasks.</p>
                </div>

                {/* Login Card */}
                <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl p-10">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-2 ml-1">
                                <label className="block text-sm font-bold text-gray-400">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-accent hover:underline font-bold">
                                    Forgot?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transform hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-[#1e293b] text-gray-500 font-bold tracking-widest">OR</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="mb-8">
                        <SocialLogin />
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-gray-400 text-sm font-medium">
                        New here?{' '}
                        <Link to="/register" className="text-accent font-black hover:underline ml-1">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
