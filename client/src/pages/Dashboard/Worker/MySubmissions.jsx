import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const MySubmissions = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: submissions = [] } = useQuery({
        queryKey: ['my-submissions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/submissions?email=${user.email}`);
            return res.data;
        }
    });

    // Calculate pagination
    const totalPages = Math.ceil(submissions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSubmissions = submissions.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">My Submissions</h2>
            <div className="overflow-x-auto bg-[#1e293b]/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/5">
                <table className="table text-gray-300">
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Buyer</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSubmissions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8">No submissions found</td>
                            </tr>
                        ) : (
                            currentSubmissions.map(sub => (
                                <tr key={sub._id}>
                                    <td>{sub.task_title}</td>
                                    <td>{sub.buyer_name}</td>
                                    <td>{sub.payable_amount} coins</td>
                                    <td>{new Date(sub.submitted_at).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge ${sub.status === 'approved' ? 'badge-success' : sub.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
                                >
                                    {page}
                                </button>
                            );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page}>...</span>;
                        }
                        return null;
                    })}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MySubmissions;
