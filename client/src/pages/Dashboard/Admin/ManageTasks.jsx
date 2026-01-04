import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageTasks = () => {
    const axiosPublic = useAxiosPublic();

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['admin-tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin/tasks');
            return res.data;
        }
    });

    const handleDelete = (id, title) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete task: ${title}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/admin/tasks/${id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire("Deleted!", "Task has been deleted.", "success");
                            refetch();
                        }
                    })
                    .catch(err => {
                        Swal.fire("Error", err.response?.data?.message || "Failed to delete task", "error");
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Manage Tasks</h2>
            <div className="overflow-x-auto bg-[#1e293b]/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/5">
                <table className="table text-gray-300">
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Buyer</th>
                            <th>Required Workers</th>
                            <th>Payable Amount</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.task_title}</td>
                                <td>{task.buyer_name}</td>
                                <td>{task.required_workers}</td>
                                <td>{task.payable_amount} coins</td>
                                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(task._id, task.task_title)}
                                        className="btn btn-xs btn-error text-white"
                                    >
                                        Delete Task
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTasks;

