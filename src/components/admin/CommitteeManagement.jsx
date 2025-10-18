'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useImageUpload } from '@/hooks';

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
                <h2 className="text-2xl font-semibold">Committee Management</h2>
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
                        <form onSubmit={onSubmitForm} className="space-y-4 ">
                            <div>
                                <Label className='pb-2' htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="designation">Designation</Label>
                                <Input
                                    id="designation"
                                    value={formData.designation || ''}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="email">Email (Optional)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="linkedin">LinkedIn (Optional)</Label>
                                <Input
                                    id="linkedin"
                                    value={formData.linkedin || ''}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="facebookLink">Facebook Link (Optional)</Label>
                                <Input
                                    id="facebookLink"
                                    value={formData.facebookLink || ''}
                                    onChange={(e) => setFormData({ ...formData, facebookLink: e.target.value })}
                                    placeholder="https://facebook.com/username"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className='pb-2' htmlFor="department">Department (Optional)</Label>
                                    <Input
                                        id="department"
                                        value={formData.department || ''}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        placeholder="e.g., Computer Science & Technology"
                                    />
                                </div>
                                <div>
                                    <Label className='pb-2' htmlFor="semester">Semester (Optional)</Label>
                                    <Input
                                        id="semester"
                                        value={formData.semester || ''}
                                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                        placeholder="e.g., 8th Semester"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order || ''}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    placeholder="1"
                                    min="0"
                                />
                                <p className="text-sm text-gray-500 mt-1">Lower numbers appear first (1 = highest priority)</p>
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="bio">Bio (Optional)</Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio || ''}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="image">Profile Image (Optional)</Label>
                                <div className="space-y-3">
                                    {imagePreview ? (
                                        <div className="relative inline-block">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-24 h-24 object-cover rounded-lg border"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                onClick={removeImage}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500 mb-2">Upload profile image</p>
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => document.getElementById('image').click()}
                                                disabled={isUploading}
                                            >
                                                {isUploading ? (
                                                    <>
                                                        <Upload className="h-4 w-4 mr-2 animate-spin" />
                                                        Uploading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Choose Image
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                    {uploadError && (
                                        <p className="text-sm text-red-600">{uploadError}</p>
                                    )}
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={isUploading}>
                                {editingItem ? 'Update Member' : 'Add Member'}
                            </Button>
                        </form>
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
