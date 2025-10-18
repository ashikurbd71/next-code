'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export default function EventRegistrationPage() {
    const params = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvent = useCallback(async () => {
        try {
            const response = await fetch(`/api/events/${params.eventId}`);
            if (response.ok) {
                const eventData = await response.json();
                setEvent(eventData);
            } else {
                setError('Event not found');
            }
        } catch (error) {
            console.error('Error fetching event:', error);
            setError('Failed to load event details');
        } finally {
            setLoading(false);
        }
    }, [params.eventId]);

    useEffect(() => {
        fetchEvent();
    }, [fetchEvent]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleRegistrationSuccess = () => {
        // Registration success is handled in the form component
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading event details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                        <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
                        <a
                            href="/events"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            View All Events
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="">


                {/* Event Details and Registration Form */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8">

                            {/* Registration Form */}
                            <div>
                                <Card>
                                    <CardHeader>

                                    </CardHeader>
                                    <CardContent>
                                        <EventRegistrationForm
                                            event={event}
                                            onRegistrationSuccess={handleRegistrationSuccess}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>


            </main>

            <Footer />
        </div>
    );
}
