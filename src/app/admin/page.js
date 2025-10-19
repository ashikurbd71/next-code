'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, UserPlus, Check, Quote, MessageCircle, LogOut } from 'lucide-react';
import { useAdminData, useAdminForm, useAdminActions } from '@/hooks';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PrivateRoute from '@/components/PrivateRoute';
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
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

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
        <PrivateRoute>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                    <div className="mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                                <p className="text-sm sm:text-base text-gray-600">Manage students, events, and committee members</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 h-auto p-1">
                            <TabsTrigger value="students" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Students</span>
                                <span className="sm:hidden">Students</span>
                                <span className="text-xs">({students.length})</span>
                            </TabsTrigger>
                            <TabsTrigger value="events" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Events</span>
                                <span className="sm:hidden">Events</span>
                                <span className="text-xs">({events.length})</span>
                            </TabsTrigger>
                            <TabsTrigger value="registrations" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Registrations</span>
                                <span className="sm:hidden">Reg</span>
                                <span className="text-xs">({eventRegistrations.length})</span>
                            </TabsTrigger>
                            <TabsTrigger value="committee" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                                <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Committee</span>
                                <span className="sm:hidden">Committee</span>
                                <span className="text-xs">({committee.length})</span>
                            </TabsTrigger>
                            <TabsTrigger value="testimonials" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                                <Quote className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Testimonials</span>
                                <span className="sm:hidden">Test</span>
                                <span className="text-xs">({testimonials.length})</span>
                            </TabsTrigger>
                            <TabsTrigger value="group-links" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Group Links</span>
                                <span className="sm:hidden">Links</span>
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
        </PrivateRoute>
    );
}
