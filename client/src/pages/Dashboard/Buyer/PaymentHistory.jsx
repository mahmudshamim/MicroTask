import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments/${user?.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Payment History</h2>
            <div className="overflow-x-auto bg-[#1e293b]/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/5">
                <table className="table text-gray-300">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Coins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td>{payment.transactionId}</td>
                                <td>${payment.price}</td>
                                <td>{payment.coins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
