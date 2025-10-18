'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useImageUpload } from '@/hooks';

export default function TestimonialManagement({
    testimonials,
    onDeleteTestimonial,
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
                <h2 className="text-2xl font-semibold">Testimonials Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => openDialog()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingItem ? 'Update testimonial details' : 'Add a new student testimonial'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={onSubmitForm} className="space-y-4">
                            <div>
                                <Label className='pb-2' htmlFor="name">Student Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="role">Current Role/Position</Label>
                                <Input
                                    id="role"
                                    value={formData.role || ''}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    value={formData.department || ''}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="content">Testimonial Content</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content || ''}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="isActive">Status</Label>
                                <Select
                                    value={formData.isActive ? 'true' : 'false'}
                                    onValueChange={(value) => setFormData({ ...formData, isActive: value === 'true' })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Active</SelectItem>
                                        <SelectItem value="false">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="photo">Student Photo (Optional)</Label>
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
                                            <p className="text-sm text-gray-500 mb-2">Upload student photo</p>
                                            <Input
                                                id="photo"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => document.getElementById('photo').click()}
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
                                {editingItem ? 'Update Testimonial' : 'Add Testimonial'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4 flex-1">
                                    {testimonial.photo && (
                                        <img
                                            src={testimonial.photo}
                                            alt={testimonial.name}
                                            className="w-16 h-16 object-cover rounded-lg border"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                            <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                                                {testimonial.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <p className="text-blue-600 font-medium mb-2">{testimonial.role}</p>
                                        <p className="text-gray-600 mb-2">{testimonial.department}</p>
                                        <p className="text-gray-700 italic">"{testimonial.content}"</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openDialog(testimonial)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => onDeleteTestimonial(testimonial.id)}
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
