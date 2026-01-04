import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome, FaTasks, FaList, FaMoneyBill, FaUser, FaUsers, FaClipboardCheck } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useUser from "../hooks/useUser";
import Notification from "../components/Notification";
import { RiMenu2Fill } from "react-icons/ri";

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const [role] = useRole();
    const { userData } = useUser();

    return (
        <div className="drawer lg:drawer-open overflow-hidden">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
                {/* Desktop Top Bar - Always on top, sticky */}
                <header className="sticky top-0 z-30 flex h-20 w-full justify-center bg-base-100/80 backdrop-blur transition-all shadow-sm border-b border-white/5 px-4 md:px-8">
                    <div className="flex w-full items-center justify-between">
                        {/* Mobile Menu Toggle */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button">
                                <RiMenu2Fill className="text-2xl" />
                            </label>
                            <span className="font-bold text-lg text-primary">MicroTask</span>
                        </div>

                        {/* Page Title / Welcome */}
                        <div className="hidden lg:block">
                            <h2 className="text-xl font-bold text-white">
                                Welcome back, <span className="text-accent">{userData?.name || user?.displayName || 'User'}</span>!
                            </h2>
                        </div>

                        {/* Profile & Actions */}
                        <div className="flex items-center gap-2 sm:gap-4 font-bold">
                            <div className="hidden sm:flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-xl text-accent border border-accent/20">
                                <FaMoneyBill />
                                <span className="text-sm">Coins: {userData?.coins || 0}</span>
                            </div>

                            <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

                            <Notification />

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-xl ring ring-accent ring-offset-2 ring-offset-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {(userData?.image || user?.photoURL) ? (
                                            <img src={userData?.image || user?.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <FaUser className="text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-300 rounded-2xl w-52 border border-white/5">
                                    <li className="px-4 py-2 border-b border-white/5 mb-1">
                                        <p className="font-bold text-white truncate">{userData?.name || user?.displayName}</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest">{role}</p>
                                    </li>
                                    <li><Link to="/" className="text-gray-300 hover:text-white">Main Home</Link></li>
                                    <li><button onClick={logOut} className="text-red-400 font-bold hover:bg-red-400/10">Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-grow p-4 md:p-10 max-w-[1600px] mx-auto w-full">
                    <Outlet></Outlet>
                </main>

                {/* Footer Placeholder inside content */}
                <footer className="footer footer-center p-4 text-gray-400 text-xs">
                    <aside>
                        <p>© 2026 MicroTask Platform - All Rights Reserved</p>
                    </aside>
                </footer>
            </div>

            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="w-72 min-h-full bg-[#0f172a] text-white flex flex-col p-6 shadow-2xl overflow-y-auto">
                    {/* Sidebar Logo */}
                    <Link to="/dashboard" className="flex items-center gap-3 mb-12 px-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <FaClipboardCheck className="text-xl" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">MicroTask</span>
                    </Link>

                    <nav className="flex-grow">
                        <ul className="menu p-0 space-y-3">
                            {
                                role === 'Worker' && <>
                                    <li><NavLink to="/dashboard/worker-home" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaHome className="text-lg" /> Dashboard</NavLink></li>
                                    <li><NavLink to="/dashboard/task-list" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaList className="text-lg" /> Job Search</NavLink></li>
                                    <li><NavLink to="/dashboard/my-submissions" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaTasks className="text-lg" /> My Submissions</NavLink></li>
                                    <li><NavLink to="/dashboard/withdrawals" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaMoneyBill className="text-lg" /> Withdrawals</NavLink></li>
                                </>
                            }
                            {
                                role === 'Buyer' && <>
                                    <li><NavLink to="/dashboard/buyer-home" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaHome className="text-lg" /> Dashboard</NavLink></li>
                                    <li><NavLink to="/dashboard/add-task" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaTasks className="text-lg" /> Post a Job</NavLink></li>
                                    <li><NavLink to="/dashboard/my-tasks" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaList className="text-lg" /> My Jobs</NavLink></li>
                                    <li><NavLink to="/dashboard/purchase-coin" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaMoneyBill className="text-lg" /> Buy Coins</NavLink></li>
                                    <li><NavLink to="/dashboard/payment-history" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaList className="text-lg" /> Payments</NavLink></li>
                                    <li><NavLink to="/dashboard/task-to-review" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaList className="text-lg" /> Submissions</NavLink></li>
                                </>
                            }
                            {
                                role === 'Admin' && <>
                                    <li><NavLink to="/dashboard/admin-home" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaHome className="text-lg" /> Overview</NavLink></li>
                                    <li><NavLink to="/dashboard/manage-users" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaUsers className="text-lg" /> Manage Users</NavLink></li>
                                    <li><NavLink to="/dashboard/manage-tasks" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaList className="text-lg" /> Manage Jobs</NavLink></li>
                                    <li><NavLink to="/dashboard/withdraw-requests" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}><FaMoneyBill className="text-lg" /> Withdrawals</NavLink></li>
                                </>
                            }
                        </ul>
                    </nav>

                    {/* Bottom Logout */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <button onClick={logOut} className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left font-bold">
                            <FaUser className="text-lg" /> Logout
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
