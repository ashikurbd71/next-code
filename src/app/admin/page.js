'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, UserPlus, Check, Quote, MessageCircle } from 'lucide-react';
import { useAdminData, useAdminForm, useAdminActions } from '@/hooks';
import {
    StudentManagement,
    EventManagement,
    RegistrationManagement,
    CommitteeManagement,
    TestimonialManagement,
    GroupLinkManagement
} from '@/components/admin';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('students');

    // Use custom hooks
    const {
        students,
        setStudents,
        events,
        setEvents,
        committee,
        setCommittee,
        testimonials,
        setTestimonials,
        eventRegistrations,
        setEventRegistrations,
        loading,
        fetchAllData
    } = useAdminData();

    const {
        isDialogOpen,
        setIsDialogOpen,
        editingItem,
        setEditingItem,
        formData,
        setFormData,
        openDialog,
        closeDialog
    } = useAdminForm();

    const {
        handleApproveStudent,
        handleDeleteStudent,
        handleDeleteEvent,
        handleDeleteCommittee,
        handleDeleteTestimonial,
        handleUpdateRegistrationStatus,
        handleDeleteRegistration,
        handleSubmitForm
    } = useAdminActions({
        setStudents,
        setEvents,
        setCommittee,
        setTestimonials,
        setEventRegistrations,
        fetchAllData
    });

    // Form submission handler that uses the hook
    const onSubmitForm = (e) => {
        handleSubmitForm(e, activeTab, editingItem, formData, closeDialog);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage students, events, and committee members</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="students" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Students ({students.length})
                        </TabsTrigger>
                        <TabsTrigger value="events" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Events ({events.length})
                        </TabsTrigger>
                        <TabsTrigger value="registrations" className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            Registrations ({eventRegistrations.length})
                        </TabsTrigger>
                        <TabsTrigger value="committee" className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Committee ({committee.length})
                        </TabsTrigger>
                        <TabsTrigger value="testimonials" className="flex items-center gap-2">
                            <Quote className="h-4 w-4" />
                            Testimonials ({testimonials.length})
                        </TabsTrigger>
                        <TabsTrigger value="group-links" className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Group Links
                        </TabsTrigger>
                    </TabsList>

                    {/* Students Tab */}
                    <TabsContent value="students" className="space-y-6">
                        <StudentManagement
                            students={students}
                            onApproveStudent={handleApproveStudent}
                            onDeleteStudent={handleDeleteStudent}
                        />
                    </TabsContent>

                    {/* Events Tab */}
                    <TabsContent value="events" className="space-y-6">
                        <EventManagement
                            events={events}
                            onDeleteEvent={handleDeleteEvent}
                            onSubmitForm={onSubmitForm}
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            editingItem={editingItem}
                            setEditingItem={setEditingItem}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </TabsContent>

                    {/* Event Registrations Tab */}
                    <TabsContent value="registrations" className="space-y-6">
                        <RegistrationManagement
                            eventRegistrations={eventRegistrations}
                            onUpdateRegistrationStatus={handleUpdateRegistrationStatus}
                            onDeleteRegistration={handleDeleteRegistration}
                        />
                    </TabsContent>

                    {/* Committee Tab */}
                    <TabsContent value="committee" className="space-y-6">
                        <CommitteeManagement
                            committee={committee}
                            onDeleteCommittee={handleDeleteCommittee}
                            onSubmitForm={onSubmitForm}
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            editingItem={editingItem}
                            setEditingItem={setEditingItem}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </TabsContent>

                    {/* Testimonials Tab */}
                    <TabsContent value="testimonials" className="space-y-6">
                        <TestimonialManagement
                            testimonials={testimonials}
                            onDeleteTestimonial={handleDeleteTestimonial}
                            onSubmitForm={onSubmitForm}
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            editingItem={editingItem}
                            setEditingItem={setEditingItem}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </TabsContent>

                    {/* Group Links Tab */}
                    <TabsContent value="group-links" className="space-y-6">
                        <GroupLinkManagement />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
