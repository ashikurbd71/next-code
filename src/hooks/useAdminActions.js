export function useAdminActions({
    setStudents,
    setEvents,
    setCommittee,
    setTestimonials,
    setEventRegistrations,
    fetchAllData
}) {
    const handleApproveStudent = async (studentId) => {
        try {
            console.log('Approving student:', studentId);
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approved: true })
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const updatedStudent = await response.json();
                console.log('Student approved:', updatedStudent);
                setStudents(prev => prev.map(s => s.id === studentId ? { ...s, approved: true } : s));
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Failed to approve student: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error approving student:', error);
            alert('Failed to approve student. Please try again.');
        }
    };

    const handleDeleteStudent = async (studentId) => {
        if (confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await fetch(`/api/students/${studentId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setStudents(prev => prev.filter(s => s.id !== studentId));
                }
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`/api/events/${eventId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setEvents(prev => prev.filter(e => e.id !== eventId));
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleDeleteCommittee = async (memberId) => {
        if (confirm('Are you sure you want to delete this committee member?')) {
            try {
                const response = await fetch(`/api/committee/${memberId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setCommittee(prev => prev.filter(m => m.id !== memberId));
                }
            } catch (error) {
                console.error('Error deleting committee member:', error);
            }
        }
    };

    const handleDeleteTestimonial = async (testimonialId) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const response = await fetch(`/api/testimonials/${testimonialId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setTestimonials(prev => prev.filter(t => t.id !== testimonialId));
                }
            } catch (error) {
                console.error('Error deleting testimonial:', error);
            }
        }
    };

    const handleUpdateRegistrationStatus = async (registrationId, newStatus) => {
        try {
            const response = await fetch(`/api/event-registrations/${registrationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setEventRegistrations(prev =>
                    prev.map(reg =>
                        reg.id === registrationId ? { ...reg, status: newStatus } : reg
                    )
                );
            }
        } catch (error) {
            console.error('Error updating registration status:', error);
        }
    };

    const handleDeleteRegistration = async (registrationId) => {
        if (confirm('Are you sure you want to delete this registration?')) {
            try {
                const response = await fetch(`/api/event-registrations/${registrationId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setEventRegistrations(prev => prev.filter(reg => reg.id !== registrationId));
                }
            } catch (error) {
                console.error('Error deleting registration:', error);
            }
        }
    };

    const handleSubmitForm = async (e, activeTab, editingItem, formData, closeDialog) => {
        e.preventDefault();

        try {
            let url, method;

            if (activeTab === 'events') {
                url = editingItem ? `/api/events/${editingItem.id}` : '/api/events';
                method = editingItem ? 'PATCH' : 'POST';
            } else if (activeTab === 'committee') {
                url = editingItem ? `/api/committee/${editingItem.id}` : '/api/committee';
                method = editingItem ? 'PATCH' : 'POST';
            } else if (activeTab === 'testimonials') {
                url = editingItem ? `/api/testimonials/${editingItem.id}` : '/api/testimonials';
                method = editingItem ? 'PATCH' : 'POST';
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                await fetchAllData();
                closeDialog();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return {
        handleApproveStudent,
        handleDeleteStudent,
        handleDeleteEvent,
        handleDeleteCommittee,
        handleDeleteTestimonial,
        handleUpdateRegistrationStatus,
        handleDeleteRegistration,
        handleSubmitForm
    };
}
