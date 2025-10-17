import { useState, useEffect } from 'react';

export function useAdminData() {
    const [students, setStudents] = useState([]);
    const [events, setEvents] = useState([]);
    const [committee, setCommittee] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [eventRegistrations, setEventRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            const [studentsRes, eventsRes, committeeRes, testimonialsRes, registrationsRes] = await Promise.all([
                fetch('/api/students'),
                fetch('/api/events'),
                fetch('/api/committee'),
                fetch('/api/testimonials'),
                fetch('/api/event-registrations')
            ]);

            if (studentsRes.ok) {
                const studentsData = await studentsRes.json();
                setStudents(studentsData);
            }

            if (eventsRes.ok) {
                const eventsData = await eventsRes.json();
                setEvents(eventsData);
            }

            if (committeeRes.ok) {
                const committeeData = await committeeRes.json();
                setCommittee(committeeData);
            }

            if (testimonialsRes.ok) {
                const testimonialsData = await testimonialsRes.json();
                setTestimonials(testimonialsData);
            }

            if (registrationsRes.ok) {
                const registrationsData = await registrationsRes.json();
                setEventRegistrations(registrationsData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return {
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
    };
}
