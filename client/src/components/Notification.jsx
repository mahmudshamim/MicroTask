import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const notificationRef = useRef(null);

    const { data: notifications = [], refetch } = useQuery({
        queryKey: ['notifications', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/notifications/${user?.email}`);
            return res.data;
        }
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Close notification when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            axiosPublic.patch(`/notifications/${notification._id}`)
                .then(() => {
                    refetch();
                });
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={notificationRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-circle relative"
            >
                <FaBell className="text-xl" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 badge badge-error badge-sm">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-96 bg-base-300 rounded-3xl shadow-2xl z-50 overflow-hidden border border-white/5 animate-fadeIn">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <h3 className="font-bold text-white text-lg">Notifications</h3>
                        {unreadCount > 0 && <span className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full">{unreadCount} New</span>}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto divide-y divide-white/5">
                        {notifications.length === 0 ? (
                            <div className="p-10 text-center text-gray-400">
                                <FaBell className="text-4xl mx-auto mb-3 opacity-20" />
                                <p>All caught up!</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`p-6 hover:bg-white/5 transition-colors cursor-pointer group ${!notification.isRead ? 'bg-accent/5' : ''}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notification.isRead ? 'bg-accent shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`}></div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm leading-relaxed ${!notification.isRead ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 font-medium">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {new Date(notification.time).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {notifications.length > 0 && (
                        <div className="p-4 bg-white/5 text-center">
                            <button onClick={() => setIsOpen(false)} className="text-xs font-bold text-gray-500 hover:text-accent transition-colors uppercase tracking-wider">Dismiss All</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;

