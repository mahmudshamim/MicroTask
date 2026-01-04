import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import SocialLogin from "../components/SocialLogin";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { uploadImageToImgBB } from "../utils/imgbb";
import Swal from 'sweetalert2';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaUserTag } from "react-icons/fa";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoFile = form.photo.files[0];
        const password = form.password.value;
        const role = form.role.value;

        // Validation
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Weak Password',
                text: 'Password should be at least 6 characters',
                confirmButtonColor: '#EF4444',
            });
            return;
        }

        if (!photoFile) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Photo',
                text: 'Please upload a profile picture',
                confirmButtonColor: '#EF4444',
            });
            return;
        }

        setUploading(true);
        let photoUrl = '';

        try {
            photoUrl = await uploadImageToImgBB(photoFile);
        } catch (error) {
            setUploading(false);
            Swal.fire({
                icon: 'error',
                title: 'Image Upload Failed',
                text: error.message || 'Failed to upload image. Please try again.',
                confirmButtonColor: '#EF4444',
            });
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            role: role,
                            image: photoUrl
                        }
                        axiosPublic.post('/users/' + email, userInfo)
                            .then(res => {
                                setUploading(false);
                                if (res.data._id || res.data.insertedId) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Welcome to MicroTask!',
                                        text: 'Your account has been created successfully.',
                                        confirmButtonColor: '#10B981',
                                        showConfirmButton: false,
                                        timer: 2000
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(err => {
                                setUploading(false);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Registration Failed',
                                    text: err.response?.data?.message || 'Failed to create user',
                                    confirmButtonColor: '#EF4444',
                                });
                            });
                    })
                    .catch(error => {
                        setUploading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Profile Update Failed',
                            text: error.message,
                            confirmButtonColor: '#EF4444',
                        });
                    });
            })
            .catch(error => {
                setUploading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                    confirmButtonColor: '#EF4444',
                });
            });
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Create Account</h1>
                    <p className="text-gray-400">Join the community and start your journey.</p>
                </div>

                {/* Register Card */}
                <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl p-10">
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">
                                Profile Picture
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer">
                                    <div className="flex items-center gap-3 px-4 py-4 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl hover:border-accent hover:bg-white/10 transition-all">
                                        <FaCamera className="text-gray-500 text-xl" />
                                        <span className="text-sm text-gray-400 font-medium">Select Image</span>
                                    </div>
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </label>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-2xl object-cover border-2 border-accent shadow-lg shadow-accent/20" />
                                )}
                            </div>
                        </div>

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
                            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">
                                Password
                            </label>
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

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">
                                Select Role
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUserTag className="text-gray-500" />
                                </div>
                                <select
                                    defaultValue="Worker"
                                    name="role"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none cursor-pointer outline-none"
                                >
                                    <option value="Worker" className="bg-[#1e293b]">Worker</option>
                                    <option value="Buyer" className="bg-[#1e293b]">Buyer</option>
                                </select>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full bg-primary hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transform hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {uploading ? 'Processing...' : 'Register'}
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

                    {/* Login Link */}
                    <p className="text-center text-gray-400 text-sm font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent font-black hover:underline ml-1">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
