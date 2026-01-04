import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: userData = null, isLoading: isUserLoading, refetch } = useQuery({
        queryKey: ['user-data', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    return { userData, isLoading: isUserLoading || loading, refetch };
};

export default useUser;

