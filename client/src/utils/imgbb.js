// imgBB Image Upload Utility
export const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    
    if (!apiKey) {
        throw new Error('ImgBB API key is not configured');
    }

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return data.data.url;
        } else {
            throw new Error(data.error?.message || 'Failed to upload image');
        }
    } catch (error) {
        throw new Error(error.message || 'Failed to upload image to imgBB');
    }
};

