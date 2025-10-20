'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useImageUpload } from '@/hooks';

export default function TestimonialForm({
    onSubmit,
    initialData = {},
    isEditing = false,
    isLoading = false
}) {
    const { uploadImage, isUploading, uploadError, resetError } = useImageUpload();
    const [imagePreview, setImagePreview] = useState(initialData.photo || null);
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        role: initialData.role || '',
        department: initialData.department || '',
        session: initialData.session || '',
        gmail: initialData.gmail || '',
        linkedinProfile: initialData.linkedinProfile || '',
        currentCompany: initialData.currentCompany || '',
        content: initialData.content || '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        photo: initialData.photo || ''
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                    {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Student Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base font-medium">Student Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter student's full name"
                            className="text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Current Role/Position */}
                    <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm sm:text-base font-medium">Current Role/Position *</Label>
                        <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            placeholder="e.g., Software Engineer, Data Analyst"
                            className="text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                        <Label htmlFor="department" className="text-sm sm:text-base font-medium">Department *</Label>
                        <Input
                            id="department"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            placeholder="e.g., Computer Science, Information Technology"
                            className="text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Session */}
                    <div className="space-y-2">
                        <Label htmlFor="session" className="text-sm sm:text-base font-medium">Session</Label>
                        <Select
                            value={formData.session}
                            onValueChange={(value) => handleInputChange('session', value)}
                        >
                            <SelectTrigger className="text-sm sm:text-base">
                                <SelectValue placeholder="Select session" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2020-21">2020-21</SelectItem>
                                <SelectItem value="2021-22">2021-22</SelectItem>
                                <SelectItem value="2022-23">2022-23</SelectItem>
                                <SelectItem value="2023-24">2023-24</SelectItem>
                                <SelectItem value="2024-25">2024-25</SelectItem>
                                <SelectItem value="2025-26">2025-26</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Gmail */}
                    <div className="space-y-2">
                        <Label htmlFor="gmail" className="text-sm sm:text-base font-medium">Gmail</Label>
                        <Input
                            id="gmail"
                            type="email"
                            value={formData.gmail}
                            onChange={(e) => handleInputChange('gmail', e.target.value)}
                            placeholder="your.email@gmail.com"
                            className="text-sm sm:text-base"
                        />
                    </div>

                    {/* LinkedIn Profile */}
                    <div className="space-y-2">
                        <Label htmlFor="linkedinProfile" className="text-sm sm:text-base font-medium">LinkedIn Profile</Label>
                        <Input
                            id="linkedinProfile"
                            value={formData.linkedinProfile}
                            onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="text-sm sm:text-base"
                        />
                    </div>

                    {/* Current Company */}
                    <div className="space-y-2">
                        <Label htmlFor="currentCompany" className="text-sm sm:text-base font-medium">Current Company</Label>
                        <Input
                            id="currentCompany"
                            value={formData.currentCompany}
                            onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                            placeholder="Your current company name"
                            className="text-sm sm:text-base"
                        />
                    </div>

                    {/* Testimonial Content */}
                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-sm sm:text-base font-medium">Testimonial Content *</Label>
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => handleInputChange('content', e.target.value)}
                            placeholder="Share the student's experience and feedback..."
                            rows={4}
                            className="text-sm sm:text-base resize-none"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label htmlFor="isActive" className="text-sm sm:text-base font-medium">Status</Label>
                        <Select
                            value={formData.isActive ? 'true' : 'false'}
                            onValueChange={(value) => handleInputChange('isActive', value === 'true')}
                        >
                            <SelectTrigger className="text-sm sm:text-base">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Student Photo */}
                    <div className="space-y-2">
                        <Label htmlFor="photo" className="text-sm sm:text-base font-medium">Student Photo (Optional)</Label>
                        <div className="space-y-3">
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border shadow-sm"
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        className="absolute -top-2 -right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0"
                                        onClick={removeImage}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-gray-400 transition-colors">
                                    <ImageIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Upload student photo</p>
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
                                        className="text-xs sm:text-sm"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                                                <span className="hidden sm:inline">Uploading...</span>
                                                <span className="sm:hidden">Upload...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                                <span className="hidden sm:inline">Choose Image</span>
                                                <span className="sm:hidden">Choose</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                            {uploadError && (
                                <p className="text-xs sm:text-sm text-red-600 bg-red-50 p-2 rounded">
                                    {uploadError}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            className="flex-1 text-sm sm:text-base h-10 sm:h-11"
                            disabled={isUploading || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    <span className="hidden sm:inline">{isEditing ? 'Updating...' : 'Adding...'}</span>
                                    <span className="sm:hidden">{isEditing ? 'Update...' : 'Add...'}</span>
                                </>
                            ) : (
                                <>
                                    <span className="hidden sm:inline">{isEditing ? 'Update Testimonial' : 'Add Testimonial'}</span>
                                    <span className="sm:hidden">{isEditing ? 'Update' : 'Add'}</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}