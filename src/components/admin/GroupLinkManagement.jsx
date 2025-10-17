'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, ExternalLink, Users, MessageCircle } from 'lucide-react';

export default function GroupLinkManagement() {
    const [groupLinks, setGroupLinks] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingGroupLink, setEditingGroupLink] = useState(null);
    const [formData, setFormData] = useState({
        eventId: '',
        title: '',
        description: '',
        url: '',
        platform: 'whatsapp',
        joinCode: '',
        maxMembers: '',
        isActive: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [groupLinksResponse, eventsResponse] = await Promise.all([
                fetch('/api/group-links'),
                fetch('/api/events')
            ]);

            if (groupLinksResponse.ok) {
                const groupLinksData = await groupLinksResponse.json();
                setGroupLinks(groupLinksData);
            }

            if (eventsResponse.ok) {
                const eventsData = await eventsResponse.json();
                setEvents(eventsData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingGroupLink
                ? `/api/group-links/${editingGroupLink.id}`
                : '/api/group-links';

            const method = editingGroupLink ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    maxMembers: formData.maxMembers ? parseInt(formData.maxMembers) : null
                }),
            });

            if (response.ok) {
                await fetchData();
                resetForm();
                setIsDialogOpen(false);
            } else {
                console.error('Failed to save group link');
            }
        } catch (error) {
            console.error('Error saving group link:', error);
        }
    };

    const handleEdit = (groupLink) => {
        setEditingGroupLink(groupLink);
        setFormData({
            eventId: groupLink.eventId.toString(),
            title: groupLink.title,
            description: groupLink.description || '',
            url: groupLink.url,
            platform: groupLink.platform,
            joinCode: groupLink.joinCode || '',
            maxMembers: groupLink.maxMembers?.toString() || '',
            isActive: groupLink.isActive
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this group link?')) {
            return;
        }

        try {
            const response = await fetch(`/api/group-links/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchData();
            } else {
                console.error('Failed to delete group link');
            }
        } catch (error) {
            console.error('Error deleting group link:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            eventId: '',
            title: '',
            description: '',
            url: '',
            platform: 'whatsapp',
            joinCode: '',
            maxMembers: '',
            isActive: true
        });
        setEditingGroupLink(null);
    };

    const getPlatformIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'whatsapp':
            case 'telegram':
            case 'discord':
                return <MessageCircle className="h-4 w-4" />;
            default:
                return <ExternalLink className="h-4 w-4" />;
        }
    };

    const getPlatformName = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'whatsapp':
                return 'WhatsApp';
            case 'telegram':
                return 'Telegram';
            case 'discord':
                return 'Discord';
            default:
                return 'Group';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Group Link Management</h2>
                    <p className="text-gray-600">Manage group links for events</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Group Link
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingGroupLink ? 'Edit Group Link' : 'Add New Group Link'}
                            </DialogTitle>
                            <DialogDescription>
                                Create or update a group link for an event
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="eventId">Event *</Label>
                                <Select
                                    value={formData.eventId}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, eventId: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {events.map((event) => (
                                            <SelectItem key={event.id} value={event.id.toString()}>
                                                {event.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="e.g., Event Discussion Group"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe the purpose of this group..."
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="url">Group URL *</Label>
                                <Input
                                    id="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                                    placeholder="https://chat.whatsapp.com/..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="platform">Platform</Label>
                                    <Select
                                        value={formData.platform}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                            <SelectItem value="telegram">Telegram</SelectItem>
                                            <SelectItem value="discord">Discord</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="maxMembers">Max Members</Label>
                                    <Input
                                        id="maxMembers"
                                        type="number"
                                        value={formData.maxMembers}
                                        onChange={(e) => setFormData(prev => ({ ...prev, maxMembers: e.target.value }))}
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="joinCode">Join Code</Label>
                                <Input
                                    id="joinCode"
                                    value={formData.joinCode}
                                    onChange={(e) => setFormData(prev => ({ ...prev, joinCode: e.target.value }))}
                                    placeholder="Optional join code"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingGroupLink ? 'Update' : 'Create'} Group Link
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {groupLinks.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Group Links</h3>
                            <p className="text-gray-600">Create your first group link to get started.</p>
                        </CardContent>
                    </Card>
                ) : (
                    groupLinks.map((groupLink) => (
                        <Card key={groupLink.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {getPlatformIcon(groupLink.platform)}
                                            <h3 className="text-lg font-semibold">{groupLink.title}</h3>
                                            <Badge variant={groupLink.isActive ? 'default' : 'secondary'}>
                                                {groupLink.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>

                                        <p className="text-gray-600 mb-2">
                                            <strong>Event:</strong> {groupLink.event?.title}
                                        </p>

                                        {groupLink.description && (
                                            <p className="text-gray-600 mb-3">{groupLink.description}</p>
                                        )}

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                <span>
                                                    {groupLink.currentMembers} members
                                                    {groupLink.maxMembers && ` / ${groupLink.maxMembers} max`}
                                                </span>
                                            </div>

                                            {groupLink.joinCode && (
                                                <div>
                                                    Join Code: <span className="font-mono font-semibold">{groupLink.joinCode}</span>
                                                </div>
                                            )}

                                            <div>
                                                Platform: {getPlatformName(groupLink.platform)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.open(groupLink.url, '_blank')}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(groupLink)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(groupLink.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
