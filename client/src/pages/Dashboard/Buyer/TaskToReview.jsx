import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const TaskToReview = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['buyer-submissions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/buyer-submissions?email=${user?.email}`);
            return res.data;
        }
    });

    const handleReview = (id, status) => {
        axiosPublic.patch(`/submissions/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success", `Submission ${status}`, "success");
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Tasks To Review</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissions.map(sub => (
                    <div key={sub._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{sub.worker_name}</h2>
                            <p className="text-sm text-gray-500">{sub.worker_email}</p>
                            <p className="font-bold">{sub.task_title}</p>
                            <div className="bg-gray-100 p-2 rounded mt-2 text-sm">{sub.submission_details}</div>
                            <div className="card-actions justify-end mt-4">
                                <button onClick={() => handleReview(sub._id, 'approved')} className="btn btn-success btn-sm text-white">Approve</button>
                                <button onClick={() => handleReview(sub._id, 'rejected')} className="btn btn-error btn-sm text-white">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {submissions.length === 0 && <p>No pending submissions to review.</p>}
        </div>
    );
};

export default TaskToReview;
