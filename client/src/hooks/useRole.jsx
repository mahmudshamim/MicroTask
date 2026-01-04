import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: role = '', isLoading: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data?.role;
        }
    })
    return [role, isRoleLoading]
};

export default useRole;
