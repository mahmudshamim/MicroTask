import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const WithdrawRequests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: withdrawals = [], refetch } = useQuery({
        queryKey: ['pending-withdrawals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/pending-withdrawals');
            return res.data;
        }
    });

    const handleApprove = (id, workerName, amount) => {
        Swal.fire({
            title: "Approve Withdrawal?",
            text: `Approve withdrawal of $${amount.toFixed(2)} for ${workerName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/withdrawals/${id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire("Approved!", "Withdrawal has been approved and coins deducted.", "success");
                            refetch();
                        }
                    })
                    .catch(err => {
                        Swal.fire("Error", err.response?.data?.message || "Failed to approve withdrawal", "error");
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Withdrawal Requests</h2>
            <div className="overflow-x-auto bg-[#1e293b]/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/5">
                <table className="table text-gray-300">
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Worker Email</th>
                            <th>Withdrawal Amount</th>
                            <th>Coins</th>
                            <th>Payment System</th>
                            <th>Account Number</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawals.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-8">No pending withdrawal requests</td>
                            </tr>
                        ) : (
                            withdrawals.map(withdrawal => (
                                <tr key={withdrawal._id}>
                                    <td>{withdrawal.worker_name}</td>
                                    <td>{withdrawal.worker_email}</td>
                                    <td>${withdrawal.withdrawal_amount.toFixed(2)}</td>
                                    <td>{withdrawal.withdrawal_coin}</td>
                                    <td>{withdrawal.payment_system}</td>
                                    <td>{withdrawal.account_number}</td>
                                    <td>{new Date(withdrawal.withdraw_date).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleApprove(withdrawal._id, withdrawal.worker_name, withdrawal.withdrawal_amount)}
                                            className="btn btn-xs btn-success text-white"
                                        >
                                            Payment Success
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WithdrawRequests;

