'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useImageUpload } from '@/hooks';
import CommitteeForm from '@/components/CommitteeForm';

export default function CommitteeManagement({
    committee,
    onDeleteCommittee,
    onSubmitForm,
    isDialogOpen,
    setIsDialogOpen,
    editingItem,
    setEditingItem,
    formData,
    setFormData
}) {
    const { uploadImage, isUploading, uploadError, resetError } = useImageUpload();
    const [imagePreview, setImagePreview] = useState(null);

    const openDialog = (item = null) => {
        setEditingItem(item);
        setFormData(item || {});
        setImagePreview(item?.photo || null);
        setIsDialogOpen(true);
        resetError();
    };

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Committee Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => openDialog()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingItem ? 'Edit Committee Member' : 'Add New Committee Member'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingItem ? 'Update member details' : 'Add a new committee member'}
                            </DialogDescription>
                        </DialogHeader>
                        <CommitteeForm
                            onSubmitForm={onSubmitForm}
                            editingItem={editingItem}
                            formData={formData}
                            setFormData={setFormData}
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}
                            removeImage={removeImage}
                            handleImageUpload={handleImageUpload}
                            isUploading={isUploading}
                            uploadError={uploadError}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {committee
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((member) => (
                        <Card key={member.id}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-4 flex-1">
                                        {member.photo && (
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                                {member.order && (
                                                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                                        Order: {member.order}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-blue-600 font-medium mb-2">{member.designation}</p>
                                            {member.department && (
                                                <p className="text-gray-600 text-sm mb-1">
                                                    <span className="font-medium">Department:</span> {member.department}
                                                </p>
                                            )}
                                            {member.semester && (
                                                <p className="text-gray-600 text-sm mb-1">
                                                    <span className="font-medium">Semester:</span> {member.semester}
                                                </p>
                                            )}
                                            {member.email && <p className="text-gray-600 mb-1">{member.email}</p>}
                                            <div className="flex gap-4 mb-2">
                                                {member.linkedin && (
                                                    <a
                                                        href={member.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                )}
                                                {member.facebookLink && (
                                                    <a
                                                        href={member.facebookLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Facebook
                                                    </a>
                                                )}
                                            </div>
                                            {member.bio && (
                                                <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openDialog(member)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => onDeleteCommittee(member.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    );
}
