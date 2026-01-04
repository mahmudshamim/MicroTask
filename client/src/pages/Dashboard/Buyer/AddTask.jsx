import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { uploadImageToImgBB } from "../../../utils/imgbb";
import Swal from "sweetalert2";

const AddTask = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTask = async (event) => {
        event.preventDefault();
        const form = event.target;
        const task_title = form.task_title.value;
        const task_detail = form.task_detail.value;
        const required_workers = parseInt(form.required_workers.value);
        const payable_amount = parseInt(form.payable_amount.value);
        const completion_date = form.completion_date.value;
        const submission_info = form.submission_info.value;
        const task_image_file = form.task_image.files[0];

        let task_image_url = '';

        // Upload image if provided
        if (task_image_file) {
            setUploading(true);
            try {
                task_image_url = await uploadImageToImgBB(task_image_file);
            } catch (error) {
                setUploading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: error.message || 'Failed to upload image. Please try again.'
                });
                return;
            }
        }

        const taskInfo = {
            task_title,
            task_detail,
            required_workers,
            payable_amount,
            completion_date,
            submission_info,
            task_image_url,
            buyer_email: user?.email,
            buyer_name: user?.displayName,
            created_at: new Date()
        }

        axiosPublic.post('/tasks', taskInfo)
            .then(res => {
                setUploading(false);
                if (res.data._id || res.data.insertedId) {
                    Swal.fire({ position: 'top-end', icon: 'success', title: 'Task Added', showConfirmButton: false, timer: 1500 });
                    navigate('/dashboard/my-tasks');
                }
            })
            .catch(err => {
                setUploading(false);
                Swal.fire({ icon: 'error', title: 'Oops...', text: err.response?.data?.message || 'Failed to add task' });
                if (err.response?.data?.message?.includes('Not enough coins')) {
                    navigate('/dashboard/purchase-coin');
                }
            })
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Add New Task</h2>
            <div className="bg-[#1e293b]/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-control">
                        <label className="label"><span className="label-text text-gray-400 font-bold">Task Title</span></label>
                        <input type="text" name="task_title" placeholder="What needs to be done?" className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text text-gray-400 font-bold">Task Detail</span></label>
                        <input type="text" name="task_detail" placeholder="Detailed description..." className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text text-gray-400 font-bold">Required Workers</span></label>
                        <input type="number" name="required_workers" placeholder="e.g. 10" className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text text-gray-400 font-bold">Payable Amount (per worker)</span></label>
                        <input type="number" name="payable_amount" placeholder="e.g. 5" className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text text-gray-400 font-bold">Completion Date</span></label>
                        <input type="date" name="completion_date" className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text text-gray-400 font-bold">Submission Info</span></label>
                        <input type="text" name="submission_info" placeholder="What should workers provide?" className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent" required />
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label"><span className="label-text text-gray-400 font-bold">Task Image</span></label>
                        <input
                            type="file"
                            name="task_image"
                            accept="image/*"
                            className="file-input file-input-bordered bg-white/5 border-white/10 w-full"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-2xl border border-white/10" />
                            </div>
                        )}
                    </div>

                    <div className="form-control mt-6 md:col-span-2">
                        <button className="btn btn-primary rounded-xl h-14 text-lg font-black" disabled={uploading}>
                            {uploading ? 'Processing...' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
