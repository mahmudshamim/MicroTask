import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic"; // Should be secure later
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const TaskDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${id}`);
            return res.data;
        }
    });

    const handleSubmit = event => {
        event.preventDefault();
        const submission_details = event.target.submission_details.value;

        const submission = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,
            worker_email: user.email,
            worker_name: user.displayName,
            buyer_email: task.buyer_email,
            buyer_name: task.buyer_name,
            submission_details,
            status: 'pending',
            submitted_at: new Date()
        }

        axiosPublic.post('/submissions', submission)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Submission Received',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="card bg-base-100 shadow-xl p-8">
            <figure><img src={task.task_image_url} alt="Task" className="h-64 object-cover w-full rounded-xl mb-4" /></figure>
            <h2 className="text-3xl font-bold mb-2">{task.task_title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <p><span className="font-bold">Buyer:</span> {task.buyer_name}</p>
                <p><span className="font-bold">Deadline:</span> {new Date(task.completion_date).toLocaleDateString()}</p>
                <p><span className="font-bold">Reward:</span> {task.payable_amount} Coins</p>
                <p><span className="font-bold">Slots:</span> {task.required_workers}</p>
            </div>

            <p className="mb-4"><span className="font-bold">Description:</span> {task.task_detail}</p>
            <p className="mb-8"><span className="font-bold">Submission Info:</span> {task.submission_info}</p>

            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Submission Details</span>
                    </label>
                    <textarea name="submission_details" className="textarea textarea-bordered h-24" placeholder="Enter proof details here..." required></textarea>
                </div>
                <button className="btn btn-primary mt-4 w-full">Submit Task</button>
            </form>
        </div>
    );
};

export default TaskDetails;
