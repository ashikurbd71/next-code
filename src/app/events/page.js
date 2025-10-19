'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = useCallback(async () => {
        try {
            const [upcomingResponse, pastResponse] = await Promise.all([
                fetch('/api/events?upcoming=true'),
                fetch('/api/events?upcoming=false')
            ]);

            if (upcomingResponse.ok) {
                const upcomingData = await upcomingResponse.json();
                setUpcomingEvents(upcomingData);
            } else {
                setUpcomingEvents(getFallbackUpcomingEvents());
            }

            if (pastResponse.ok) {
                const pastData = await pastResponse.json();
                setPastEvents(pastData);
            } else {
                setPastEvents(getFallbackPastEvents());
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setUpcomingEvents(getFallbackUpcomingEvents());
            setPastEvents(getFallbackPastEvents());
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const getFallbackUpcomingEvents = () => [
        {
            id: 1,
            title: "React Workshop: Building Modern UIs",
            description: "Learn the latest React patterns and best practices for building scalable user interfaces. Perfect for beginners and intermediate developers.",
            date: "2024-02-15T10:00:00Z",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=center",
            registrationLink: "https://forms.gle/example1",
            isUpcoming: true
        },
        {
            id: 2,
            title: "AI & Machine Learning Hackathon",
            description: "48-hour hackathon focused on AI solutions for real-world problems. Prizes worth $5000 for winning teams.",
            date: "2024-02-20T09:00:00Z",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop&crop=center",
            registrationLink: "https://forms.gle/example2",
            isUpcoming: true
        },
        {
            id: 3,
            title: "Web Security Workshop",
            description: "Deep dive into web security vulnerabilities and how to protect your applications. Hands-on exercises included.",
            date: "2024-02-25T14:00:00Z",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center",
            registrationLink: null,
            isUpcoming: true
        }
    ];

    const getFallbackPastEvents = () => [
        {
            id: 4,
            title: "JavaScript Fundamentals Bootcamp",
            description: "Comprehensive 3-day bootcamp covering ES6+, async programming, and modern JavaScript patterns.",
            date: "2024-01-15T10:00:00Z",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop&crop=center",
            isUpcoming: false
        },
        {
            id: 5,
            title: "Mobile App Development Workshop",
            description: "Learn React Native and Flutter for cross-platform mobile development. Build a complete app from scratch.",
            date: "2024-01-10T14:00:00Z",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center",
            isUpcoming: false
        },
        {
            id: 6,
            title: "Data Structures & Algorithms Contest",
            description: "Competitive programming contest with 50+ participants. Problems ranging from beginner to advanced levels.",
            date: "2024-01-05T09:00:00Z",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
            isUpcoming: false
        }
    ];

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

    const isEventSoon = (dateString) => {
        const eventDate = new Date(dateString);
        const now = new Date();
        const diffTime = eventDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays > 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh] px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-responsive-sm text-gray-600">Loading events...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="overflow-x-hidden">

                {/* Upcoming Events */}
                <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
                    <div className="container-responsive">
                        <div className="text-center mb-8 sm:mb-12 md:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-4">Upcoming <span className="text-orange-800 animate-pulse">Events</span></h2>
                            <p className="text-base sm:text-lg md:text-md text-gray-600 px-2 sm:px-4 leading-relaxed max-w-4xl mx-auto">
                                Don&apos;t miss out on these exciting upcoming events. Register now to secure your spot!
                            </p>
                        </div>

                        {upcomingEvents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                                {upcomingEvents.map((event) => (
                                    <Card key={event.id} variant="elevated" className="group relative overflow-hidden hover:scale-[1.02] transition-all duration-500">
                                        {/* Image Section with Enhanced Gradient Overlay */}
                                        {event.image && (
                                            <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {/* Enhanced Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                                {/* Status Badge with Enhanced Design */}
                                                <div className="absolute top-4 right-4">
                                                    <Badge
                                                        variant={isEventSoon(event.date) ? "destructive" : "secondary"}
                                                        className="text-xs font-bold px-4 py-2 bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-full"
                                                    >
                                                        {isEventSoon(event.date) ? "🔥 Soon" : "📅 Upcoming"}
                                                    </Badge>
                                                </div>

                                                {/* Event Title Overlay with Better Typography */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-white font-bold text-lg sm:text-xl leading-tight drop-shadow-2xl">
                                                        {event.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content Section with Enhanced Layout */}
                                        <div className="p-6">
                                            {/* Header for events without images */}
                                            {!event.image && (
                                                <div className="flex items-start justify-between mb-4">
                                                    <Badge
                                                        variant={isEventSoon(event.date) ? "destructive" : "secondary"}
                                                        className="text-xs font-bold px-4 py-2 rounded-full"
                                                    >
                                                        {isEventSoon(event.date) ? "🔥 Soon" : "📅 Upcoming"}
                                                    </Badge>
                                                    <Calendar className="h-5 w-5 text-orange-600" />
                                                </div>
                                            )}

                                            {/* Title for events without images */}
                                            {!event.image && (
                                                <CardTitle className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-orange-800 transition-colors duration-300">
                                                    {event.title}
                                                </CardTitle>
                                            )}

                                            {/* Enhanced Date and Time Section */}
                                            <div className="flex items-center text-gray-600 mb-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                                                <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full mr-3">
                                                    <Clock className="h-5 w-5 text-orange-600" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-semibold text-gray-800 block">{formatDate(event.date)}</span>
                                                    <span className="text-xs text-gray-500">Event Date & Time</span>
                                                </div>
                                            </div>

                                            {/* Enhanced Description */}
                                            <div className="mb-6">
                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                    {event.description}
                                                </p>
                                            </div>

                                            {/* Enhanced Action Button */}
                                            {event.registrationLink ? (
                                                <Button asChild className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:via-orange-700 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                                                    <a
                                                        href={event.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2"
                                                    >
                                                        <span>Register Now</span>
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            ) : (
                                                <Button asChild className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:via-orange-700 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                                                    <a href={`/register/${event.id}`} className="flex items-center justify-center gap-2">
                                                        <span>Register for Event</span>
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>

                                        {/* Enhanced Decorative Elements */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500"></div>

                                        {/* Subtle corner accent */}
                                        <div className="absolute top-4 left-4 w-2 h-2 bg-orange-400 rounded-full opacity-60"></div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 sm:py-16">
                                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-responsive-lg font-semibold text-gray-600 mb-2">No Upcoming Events</h3>
                                <p className="text-responsive-sm text-gray-500">Check back soon for new events!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Past Events */}
                <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
                    <div className="container-responsive">
                        <div className="text-center mb-8 sm:mb-12 md:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-4">Past <span className="text-orange-800 animate-pulse">Events</span></h2>
                            <p className="text-base sm:text-lg md:text-md text-gray-600 px-2 sm:px-4 leading-relaxed max-w-4xl mx-auto">
                                Take a look at some of our recent successful events and workshops.
                            </p>
                        </div>

                        {pastEvents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                                {pastEvents.map((event) => (
                                    <Card key={event.id} variant="elevated" className="group relative overflow-hidden hover:scale-[1.02] transition-all duration-500 opacity-90 hover:opacity-100">
                                        {/* Image Section with Enhanced Gradient Overlay */}
                                        {event.image && (
                                            <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                />
                                                {/* Enhanced Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                                {/* Status Badge with Enhanced Design */}
                                                <div className="absolute top-4 right-4">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs font-bold px-4 py-2 bg-white/95 backdrop-blur-md border-green-500 text-green-700 shadow-xl rounded-full"
                                                    >
                                                        ✅ Completed
                                                    </Badge>
                                                </div>

                                                {/* Event Title Overlay with Better Typography */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-white font-bold text-lg sm:text-xl leading-tight drop-shadow-2xl">
                                                        {event.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content Section with Enhanced Layout */}
                                        <div className="p-6">
                                            {/* Header for events without images */}
                                            {!event.image && (
                                                <div className="flex items-start justify-between mb-4">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs font-bold px-4 py-2 border-green-500 text-green-700 rounded-full"
                                                    >
                                                        ✅ Completed
                                                    </Badge>
                                                    <Calendar className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}

                                            {/* Title for events without images */}
                                            {!event.image && (
                                                <CardTitle className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-gray-700 transition-colors duration-300">
                                                    {event.title}
                                                </CardTitle>
                                            )}

                                            {/* Enhanced Date and Time Section */}
                                            <div className="flex items-center text-gray-600 mb-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-100">
                                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                                                    <Clock className="h-5 w-5 text-gray-500" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-semibold text-gray-800 block">{formatDate(event.date)}</span>
                                                    <span className="text-xs text-gray-500">Event Date & Time</span>
                                                </div>
                                            </div>

                                            {/* Enhanced Description */}
                                            <div className="mb-6">
                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                    {event.description}
                                                </p>
                                            </div>

                                            {/* View Details Button */}
                                            <Button className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                                                View Details
                                            </Button>
                                        </div>

                                        {/* Enhanced Decorative Elements */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"></div>

                                        {/* Subtle corner accent */}
                                        <div className="absolute top-4 left-4 w-2 h-2 bg-gray-400 rounded-full opacity-60"></div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 sm:py-12 md:py-16">
                                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-responsive-lg font-semibold text-gray-600 mb-2">No Past Events</h3>
                                <p className="text-responsive-sm text-gray-500">Our event history will appear here.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-orange-800 text-white">
                    <div className="container-responsive-sm text-center">
                        <h2 className="heading-responsive-sm mb-4 sm:mb-6 px-2 sm:px-4">Want to Stay Updated?</h2>
                        <p className="text-responsive-base text-white mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed max-w-3xl mx-auto">
                            Join our community to get notified about upcoming events, workshops, and opportunities.
                        </p>
                        <Button asChild size="lg" className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                            <Link href="/join">Join NextCode</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
