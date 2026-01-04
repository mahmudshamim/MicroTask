import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// Add token to requests
axiosPublic.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
