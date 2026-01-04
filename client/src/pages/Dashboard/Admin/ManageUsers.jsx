import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const [updatingRole, setUpdatingRole] = useState(null);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin/users');
            return res.data;
        }
    });

    const handleDelete = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete user: ${name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/admin/users/${id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                            refetch();
                        }
                    })
                    .catch(err => {
                        Swal.fire("Error", err.response?.data?.message || "Failed to delete user", "error");
                    });
            }
        });
    };

    const handleRoleUpdate = (id, newRole) => {
        axiosPublic.patch(`/admin/users/${id}`, { role: newRole })
            .then(res => {
                if (res.data) {
                    Swal.fire("Success", "User role updated successfully", "success");
                    refetch();
                    setUpdatingRole(null);
                }
            })
            .catch(err => {
                Swal.fire("Error", err.response?.data?.message || "Failed to update role", "error");
                setUpdatingRole(null);
            });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
            <div className="overflow-x-auto bg-[#1e293b]/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/5">
                <table className="table text-gray-300">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Role</th>
                            <th>Coins</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user.image} alt={user.name} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {updatingRole === user._id ? (
                                        <select
                                            className="select select-bordered select-sm"
                                            defaultValue={user.role}
                                            onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                            onBlur={() => setUpdatingRole(null)}
                                            autoFocus
                                        >
                                            <option value="Worker">Worker</option>
                                            <option value="Buyer">Buyer</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    ) : (
                                        <span
                                            className="badge badge-outline cursor-pointer"
                                            onClick={() => setUpdatingRole(user._id)}
                                        >
                                            {user.role}
                                        </span>
                                    )}
                                </td>
                                <td>{user.coins || 0}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id, user.name)}
                                        className="btn btn-xs btn-error text-white"
                                    >
                                        Remove
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

export default ManageUsers;

