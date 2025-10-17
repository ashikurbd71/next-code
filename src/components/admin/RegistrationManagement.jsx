'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Eye, User, Calendar, Mail, Building, MessageSquare, GraduationCap, Search, Filter, X } from 'lucide-react';

export default function RegistrationManagement({
    eventRegistrations,
    onDeleteRegistration
}) {
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [eventFilter, setEventFilter] = useState('all');

    const openDetailModal = (registration) => {
        setSelectedRegistration(registration);
        setIsDetailModalOpen(true);
    };

    // Get unique values for filter options
    const uniqueDepartments = useMemo(() => {
        const departments = eventRegistrations
            .map(reg => reg.student?.department)
            .filter(Boolean);
        return [...new Set(departments)].sort();
    }, [eventRegistrations]);

    const uniqueEvents = useMemo(() => {
        const events = eventRegistrations
            .map(reg => reg.event?.title)
            .filter(Boolean);
        return [...new Set(events)].sort();
    }, [eventRegistrations]);

    // Filter and search logic
    const filteredRegistrations = useMemo(() => {
        return eventRegistrations.filter(registration => {
            // Search filter
            const searchMatch = searchQuery === '' ||
                registration.student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                registration.student?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                registration.student?.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                registration.student?.instituteName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                registration.event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                registration.notes?.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter
            const statusMatch = statusFilter === 'all' || registration.status === statusFilter;

            // Department filter
            const departmentMatch = departmentFilter === 'all' || registration.student?.department === departmentFilter;

            // Event filter
            const eventMatch = eventFilter === 'all' || registration.event?.title === eventFilter;

            return searchMatch && statusMatch && departmentMatch && eventMatch;
        });
    }, [eventRegistrations, searchQuery, statusFilter, departmentFilter, eventFilter]);

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setDepartmentFilter('all');
        setEventFilter('all');
    };

    // Check if any filters are active
    const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || departmentFilter !== 'all' || eventFilter !== 'all';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Event Registrations</h2>
                <div className="text-sm text-gray-500">
                    {filteredRegistrations.length} of {eventRegistrations.length} registrations
                </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, email, department, institute, event, or notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            className="flex items-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            Clear Filters
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Department Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {uniqueDepartments.map(dept => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Event Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Event</label>
                        <Select value={eventFilter} onValueChange={setEventFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Events" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Events</SelectItem>
                                {uniqueEvents.map(event => (
                                    <SelectItem key={event} value={event}>{event}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {filteredRegistrations.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <Search className="h-12 w-12 text-gray-400" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">No registrations found</h3>
                                    <p className="text-gray-500">
                                        {hasActiveFilters
                                            ? "Try adjusting your search or filter criteria"
                                            : "No event registrations available"
                                        }
                                    </p>
                                </div>
                                {hasActiveFilters && (
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    filteredRegistrations.map((registration) => (
                        <Card key={registration.id}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold">{registration.student?.name || 'Unknown Student'}</h3>
                                            <Badge variant={
                                                registration.status === 'confirmed' ? 'default' :
                                                    registration.status === 'pending' ? 'secondary' : 'destructive'
                                            }>
                                                {registration.status}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Event:</strong> {registration.event?.title || 'Unknown Event'}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Student Email:</strong> {registration.student?.email || 'N/A'}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Department:</strong> {registration.student?.department || 'N/A'}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Institute:</strong> {registration.student?.instituteName || 'N/A'}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            <strong>Registered:</strong> {new Date(registration.createdAt).toLocaleDateString()}
                                        </p>
                                        {registration.notes && (
                                            <p className="text-sm text-gray-600 italic">"{registration.notes}"</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openDetailModal(registration)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => onDeleteRegistration(registration.id)}
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

            {/* Registration Detail Modal */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Registration Details
                        </DialogTitle>
                        <DialogDescription>
                            Complete information about the event registration
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRegistration && (
                        <div className="space-y-6">
                            {/* Registration Status */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Registration Status</h3>
                                <Badge variant={
                                    selectedRegistration.status === 'confirmed' ? 'default' :
                                        selectedRegistration.status === 'pending' ? 'secondary' : 'destructive'
                                }>
                                    {selectedRegistration.status}
                                </Badge>
                            </div>

                            {/* Student Information */}
                            <div className="space-y-4">
                                <h4 className="font-medium flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Student Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{selectedRegistration.student?.name || 'Unknown Student'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{selectedRegistration.student?.email || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Building className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Department</p>
                                            <p className="font-medium">{selectedRegistration.student?.department || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Institute</p>
                                            <p className="font-medium">{selectedRegistration.student?.instituteName || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event Information */}
                            <div className="space-y-4">
                                <h4 className="font-medium flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Event Information
                                </h4>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-medium text-lg">{selectedRegistration.event?.title || 'Unknown Event'}</p>
                                    {selectedRegistration.event?.date && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {new Date(selectedRegistration.event.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Registration Details */}
                            <div className="space-y-4">
                                <h4 className="font-medium flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Registration Details
                                </h4>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Registered On</p>
                                        <p className="font-medium">
                                            {new Date(selectedRegistration.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedRegistration.notes && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-gray-500" />
                                        <h4 className="font-medium">Notes</h4>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700 italic">"{selectedRegistration.notes}"</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        onDeleteRegistration(selectedRegistration.id);
                                        setIsDetailModalOpen(false);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Registration
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
