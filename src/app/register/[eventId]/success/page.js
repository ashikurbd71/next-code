'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import RegistrationSuccess from '@/components/RegistrationSuccess';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function RegistrationSuccessPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [event, setEvent] = useState(null);
    const [registration, setRegistration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventId = params.eventId;
                const registrationId = searchParams.get('registrationId');

                // Fetch event details
                const eventResponse = await fetch(`/api/events/${eventId}`);
                if (!eventResponse.ok) {
                    throw new Error('Event not found');
                }
                const eventData = await eventResponse.json();
                setEvent(eventData);

                // Fetch registration details if registrationId is provided
                if (registrationId) {
                    const registrationResponse = await fetch(`/api/event-registrations/${registrationId}`);
                    if (registrationResponse.ok) {
                        const registrationData = await registrationResponse.json();
                        setRegistration(registrationData);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (params.eventId) {
            fetchData();
        }
    }, [params.eventId, searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center mobile-spacing-base">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 mobile-text-responsive text-gray-600">Loading registration details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center mobile-spacing-base">
                <div className="text-center">
                    <h1 className="mobile-heading-responsive font-bold text-red-600 mb-4">Error</h1>
                    <p className="mobile-text-responsive text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.href = '/events'}
                        className="mobile-button bg-blue-600 text-white rounded hover:bg-blue-700 mobile-tap-highlight"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center mobile-spacing-base">
                <div className="text-center">
                    <h1 className="mobile-heading-responsive font-bold text-gray-900 mb-4">Event Not Found</h1>
                    <p className="mobile-text-responsive text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
                    <button
                        onClick={() => window.location.href = '/events'}
                        className="mobile-button bg-blue-600 text-white rounded hover:bg-blue-700 mobile-tap-highlight"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
            <div className="container-responsive">
                <RegistrationSuccess event={event} registration={registration} />
            </div>
        </div>
    );
}
