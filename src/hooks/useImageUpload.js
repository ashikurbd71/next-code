import { useState } from 'react';

const IMGBB_API_KEY = '4c0b08895bc2ff1f30c87a652f06be0c';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export const useImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const uploadImage = async (file) => {
        if (!file) {
            setUploadError('No file provided');
            return null;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please select a valid image file');
            return null;
        }

        // Validate file size (max 32MB for ImgBB)
        const maxSize = 32 * 1024 * 1024; // 32MB
        if (file.size > maxSize) {
            setUploadError('File size must be less than 32MB');
            return null;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('key', IMGBB_API_KEY);

            const response = await fetch(IMGBB_UPLOAD_URL, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                return {
                    url: data.data.url,
                    displayUrl: data.data.display_url,
                    deleteUrl: data.data.delete_url,
                    thumb: data.data.thumb?.url,
                    medium: data.data.medium?.url,
                };
            } else {
                setUploadError(data.error?.message || 'Upload failed');
                return null;
            }
        } catch (error) {
            setUploadError('Network error occurred during upload');
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const resetError = () => {
        setUploadError(null);
    };

    return {
        uploadImage,
        isUploading,
        uploadError,
        resetError,
    };
};
