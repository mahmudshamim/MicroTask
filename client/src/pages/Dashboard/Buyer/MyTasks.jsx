import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

const MyTasks = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [editingTask, setEditingTask] = useState(null);
    const [updateForm, setUpdateForm] = useState({
        task_title: '',
        task_detail: '',
        submission_info: ''
    });

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['my-tasks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-tasks/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! Coins for uncomplete slots will be refunded.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/tasks/${id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire("Deleted!", "Your task has been deleted.", "success");
                            refetch();
                        }
                    })
                    .catch(err => {
                        Swal.fire("Error", err.response?.data?.message || "Failed to delete task", "error");
                    });
            }
        });
    };

    const handleEdit = (task) => {
        setEditingTask(task._id);
        setUpdateForm({
            task_title: task.task_title,
            task_detail: task.task_detail,
            submission_info: task.submission_info
        });
    };

    const handleUpdate = (id) => {
        axiosPublic.patch(`/tasks/${id}`, updateForm)
            .then(res => {
                if (res.data) {
                    Swal.fire("Updated!", "Your task has been updated.", "success");
                    setEditingTask(null);
                    refetch();
                }
            })
            .catch(err => {
                Swal.fire("Error", err.response?.data?.message || "Failed to update task", "error");
            });
    };

    const handleCancel = () => {
        setEditingTask(null);
        setUpdateForm({
            task_title: '',
            task_detail: '',
            submission_info: ''
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">My Tasks</h2>
            <div className="overflow-x-auto bg-[#1e293b]/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/5">
                <table className="table text-gray-300">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Amount</th>
                            <th>Workers Needed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td>
                                    {editingTask === task._id ? (
                                        <input
                                            type="text"
                                            className="input input-bordered input-sm"
                                            value={updateForm.task_title}
                                            onChange={(e) => setUpdateForm({ ...updateForm, task_title: e.target.value })}
                                        />
                                    ) : (
                                        task.task_title
                                    )}
                                </td>
                                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                                <td>{task.payable_amount}</td>
                                <td>{task.required_workers}</td>
                                <td>
                                    {editingTask === task._id ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdate(task._id)}
                                                className="btn btn-xs btn-success text-white"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="btn btn-xs btn-ghost"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="btn btn-xs btn-primary"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="btn btn-xs btn-error text-white"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {editingTask && (
                <div className="modal modal-open">
                    <div className="modal-box bg-base-300 border border-white/5 shadow-2xl rounded-[2rem]">
                        <h3 className="font-bold text-lg mb-4 text-white">Update Task</h3>
                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Title</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={updateForm.task_title}
                                    onChange={(e) => setUpdateForm({ ...updateForm, task_title: e.target.value })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Detail</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    value={updateForm.task_detail}
                                    onChange={(e) => setUpdateForm({ ...updateForm, task_detail: e.target.value })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-400">Submission Info</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    value={updateForm.submission_info}
                                    onChange={(e) => setUpdateForm({ ...updateForm, submission_info: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button onClick={handleCancel} className="btn">Cancel</button>
                            <button onClick={() => handleUpdate(editingTask)} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTasks;
