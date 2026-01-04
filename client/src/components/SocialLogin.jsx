import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'Worker',
                    image: result.user?.photoURL
                }
                axiosPublic.post('/users/' + result.user?.email, userInfo)
                    .then(() => {
                        navigate('/');
                    })
            })
            .catch(error => {
                console.error("Google Sign-In Error:", error);
            });
    }

    return (
        <div className="mt-4 px-0">
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center w-full bg-[#4285F4] hover:bg-[#357ae8] transition-all border border-[#4285F4] rounded-[2px] shadow-sm overflow-hidden"
            >
                <div className="bg-white p-2.5 m-[1px] flex items-center justify-center rounded-[1px]">
                    <FcGoogle className="text-xl" />
                </div>
                <span className="flex-grow text-white font-medium text-sm tracking-wide">
                    Sign in with Google
                </span>
            </button>
        </div>
    );
};

export default SocialLogin;
