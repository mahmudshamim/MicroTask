import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const TaskList = () => {
    const axiosPublic = useAxiosPublic();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tasks');
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Available Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    tasks.map(task => (
                        <div key={task._id} className="card bg-[#1e293b]/50 backdrop-blur-xl border border-white/5 shadow-2xl rounded-[2rem]">
                            <div className="card-body">
                                <h2 className="card-title text-white">{task.task_title}</h2>
                                <p className="text-gray-400">Buyer: <span className="text-gray-200">{task.buyer_name}</span></p>
                                <p className="text-gray-400">Deadline: <span className="text-gray-200">{new Date(task.completion_date).toLocaleDateString()}</span></p>
                                <p className="text-gray-400">Payable: <span className="font-bold text-emerald-400">{task.payable_amount} Coins</span></p>
                                <p className="text-gray-400">Required: <span className="text-gray-200">{task.required_workers}</span></p>
                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/dashboard/task-details/${task._id}`} className="btn btn-primary btn-sm rounded-lg px-6">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {tasks.length === 0 && !isLoading && <p>No tasks available right now.</p>}
        </div>
    );
};

export default TaskList;
