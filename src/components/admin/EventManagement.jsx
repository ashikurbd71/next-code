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
import { Plus, Edit, Trash2, Eye, Calendar, Link, Clock, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useImageUpload } from '@/hooks';

export default function EventManagement({
    events,
    onDeleteEvent,
    onSubmitForm,
    isDialogOpen,
    setIsDialogOpen,
    editingItem,
    setEditingItem,
    formData,
    setFormData
}) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { uploadImage, isUploading, uploadError, resetError } = useImageUpload();
    const [imagePreview, setImagePreview] = useState(null);

    const openDialog = (item = null) => {
        setEditingItem(item);
        setFormData(item || {});
        setImagePreview(item?.image || null);
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
            setFormData({ ...formData, image: result.url });
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData({ ...formData, image: '' });
        resetError();
    };

    const openDetailModal = (event) => {
        setSelectedEvent(event);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl  font-semibold">Event Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => openDialog()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingItem ? 'Edit Event' : 'Add New Event'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingItem ? 'Update event details' : 'Create a new event for the community'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={onSubmitForm} className="space-y-4">
                            <div>
                                <Label className='pb-2' htmlFor="title">Event Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="date">Event Date</Label>
                                <Input
                                    id="date"
                                    type="datetime-local"
                                    value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="isUpcoming">Event Status</Label>
                                <Select
                                    value={formData.isUpcoming ? 'true' : 'false'}
                                    onValueChange={(value) => setFormData({ ...formData, isUpcoming: value === 'true' })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Upcoming</SelectItem>
                                        <SelectItem value="false">Past</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="registrationLink">Registration Link (Optional)</Label>
                                <Input
                                    id="registrationLink"
                                    value={formData.registrationLink || ''}
                                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                                    placeholder="https://forms.gle/..."
                                />
                            </div>
                            <div>
                                <Label className='pb-2' htmlFor="image">Event Image (Optional)</Label>
                                <div className="space-y-3">
                                    {imagePreview ? (
                                        <div className="relative inline-block">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-32 h-24 object-cover rounded-lg border"
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
                                            <p className="text-sm text-gray-500 mb-2">Upload event image</p>
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
                                {editingItem ? 'Update Event' : 'Create Event'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-3 sm:gap-4">
                {events.map((event) => (
                    <Card key={event.id}>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                    {event.image && (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-16 h-12 sm:w-20 sm:h-16 object-cover rounded-lg border flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                            <h3 className="text-base sm:text-lg font-semibold break-words">{event.title}</h3>
                                            <Badge variant={event.isUpcoming ? "default" : "secondary"} className="w-fit">
                                                {event.isUpcoming ? "Upcoming" : "Past"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        {event.registrationLink && (
                                            <a
                                                href={event.registrationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-xs sm:text-sm break-all"
                                            >
                                                Registration Link
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 sm:ml-4">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openDetailModal(event)}
                                        className="flex-1 sm:flex-none"
                                    >
                                        <Eye className="h-4 w-4 sm:mr-2" />
                                        <span className="sm:hidden">View</span>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openDialog(event)}
                                        className="flex-1 sm:flex-none"
                                    >
                                        <Edit className="h-4 w-4 sm:mr-2" />
                                        <span className="sm:hidden">Edit</span>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => onDeleteEvent(event.id)}
                                        className="flex-1 sm:flex-none"
                                    >
                                        <Trash2 className="h-4 w-4 sm:mr-2" />
                                        <span className="sm:hidden">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Event Detail Modal */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Event Details
                        </DialogTitle>
                        <DialogDescription>
                            Complete information about the event
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEvent && (
                        <div className="space-y-6">
                            {/* Event Image */}
                            {selectedEvent.image && (
                                <div className="flex justify-center">
                                    <img
                                        src={selectedEvent.image}
                                        alt={selectedEvent.title}
                                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                                    />
                                </div>
                            )}

                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                                    <Badge variant={selectedEvent.isUpcoming ? "default" : "secondary"}>
                                        {selectedEvent.isUpcoming ? "Upcoming" : "Past"}
                                    </Badge>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Event Date & Time</p>
                                            <p className="font-medium">
                                                {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {selectedEvent.registrationLink && (
                                        <div className="flex items-start gap-3">
                                            <Link className="h-4 w-4 text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Registration Link</p>
                                                <a
                                                    href={selectedEvent.registrationLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline font-medium"
                                                >
                                                    {selectedEvent.registrationLink}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <h4 className="font-medium">Event Description</h4>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700">{selectedEvent.description}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        openDialog(selectedEvent);
                                        setIsDetailModalOpen(false);
                                    }}
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Event
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        onDeleteEvent(selectedEvent.id);
                                        setIsDetailModalOpen(false);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Event
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
