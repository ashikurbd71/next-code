'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useImageUpload } from '@/hooks';
import CommitteeForm from '@/components/CommitteeForm';

export default function AddCommitteePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const { uploadImage, isUploading, uploadError, resetError } = useImageUpload();
    const [imagePreview, setImagePreview] = useState(null);

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
        // Add your form submission logic here
        console.log('Form submitted:', formData);

        // After successful submission, redirect back to committee page
        router.push('/committee');
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
                    <h1 className="text-3xl font-bold">Add Committee Member</h1>
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
                    />
                </div>
            </div>
        </div>
    );
}
