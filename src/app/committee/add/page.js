'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useImageUpload } from '@/hooks';
import { toast } from 'sonner';
import CommitteeForm from '@/components/CommitteeForm';

export default function AddCommitteePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const { uploadImage, isUploading, uploadError, resetError } = useImageUpload();
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload to ImgBB
        const result = await uploadImage(file);
        if (result) {
            setFormData({ ...formData, photo: result.url });
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData({ ...formData, photo: '' });
        resetError();
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate required fields
            if (!formData.name || !formData.designation) {
                toast.error('Please fill in all required fields (Name and Designation)');
                return;
            }

            // Call the committee API
            const response = await fetch('/api/committee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit form');
            }

            const result = await response.json();
            console.log('Committee member added successfully:', result);

            // Show success message
            toast.success('Committee member added successfully!');

            // After successful submission, redirect back to home page
            router.push('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-lg font-bold">Add Your Information</h1>
                </div>

                <div className="bg-white rounded-lg border p-6">
                    <CommitteeForm
                        onSubmitForm={onSubmitForm}
                        editingItem={null}
                        formData={formData}
                        setFormData={setFormData}
                        imagePreview={imagePreview}
                        setImagePreview={setImagePreview}
                        removeImage={removeImage}
                        handleImageUpload={handleImageUpload}
                        isUploading={isUploading}
                        uploadError={uploadError}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}
