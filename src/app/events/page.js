'use client';

import { useState, useEffect } from 'react';
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

    useEffect(() => {
        fetchEvents();
    }, []);


    const fetchEvents = async () => {
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
    };

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {upcomingEvents.map((event) => (
                                    <Card key={event.id} className="hover:shadow-lg border border-orange-800 transition-all duration-300 hover:scale-[1.02]  shadow-md overflow-hidden">
                                        {event.image && (
                                            <div className="relative h-48 sm:h-52 md:h-56">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <Badge variant={isEventSoon(event.date) ? "destructive" : "secondary"} className="text-xs sm:text-sm px-2 py-1">
                                                        {isEventSoon(event.date) ? "Soon" : "Upcoming"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        )}
                                        <CardHeader className="p-4 sm:p-5 md:p-6">
                                            {!event.image && (
                                                <div className="flex items-start justify-between mb-3">
                                                    <Badge variant={isEventSoon(event.date) ? "destructive" : "secondary"} className="text-xs sm:text-sm px-2 py-1">
                                                        {isEventSoon(event.date) ? "Soon" : "Upcoming"}
                                                    </Badge>
                                                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                                                </div>
                                            )}
                                            <CardTitle className="text-responsive-lg text-gray-900 leading-tight mb-2">{event.title}</CardTitle>
                                            <CardDescription className="text-responsive-sm text-gray-500 flex items-center">
                                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                                                <span className="truncate">{formatDate(event.date)}</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-4 sm:p-5 md:p-6 pt-0">
                                            <p className="text-gray-600 mb-4 text-responsive-sm leading-relaxed line-clamp-3">{event.description}</p>
                                            {event.registrationLink ? (
                                                <Button asChild className="w-full text-responsive-sm py-2 sm:py-3 font-medium bg-orange-800 text-white">
                                                    <a
                                                        href={event.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center bg-orange-800 text-white justify-center gap-2"
                                                    >
                                                        Register Now
                                                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    </a>
                                                </Button>
                                            ) : (
                                                <Button asChild className="w-full text-responsive-sm py-2 sm:py-3 font-medium bg-orange-800 text-white">
                                                    <a href={`/register/${event.id}`}>
                                                        Register for Event
                                                    </a>
                                                </Button>
                                            )}
                                        </CardContent>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {pastEvents.map((event) => (
                                    <Card key={event.id} className="hover:shadow-lg border border-orange-800 transition-all duration-300 hover:scale-[1.02]  shadow-md overflow-hidden">
                                        {event.image && (
                                            <div className="relative h-48 sm:h-52 md:h-56">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <Badge variant="outline" className="text-xs sm:text-sm px-2 py-1 bg-white">Completed</Badge>
                                                </div>
                                            </div>
                                        )}
                                        <CardHeader className="p-4 sm:p-5 md:p-6">
                                            {!event.image && (
                                                <div className="flex items-start justify-between mb-3">
                                                    <Badge variant="outline" className="text-xs sm:text-sm px-2 py-1">Completed</Badge>
                                                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                                                </div>
                                            )}
                                            <CardTitle className="text-responsive-lg text-gray-900 leading-tight mb-2">{event.title}</CardTitle>
                                            <CardDescription className="text-responsive-sm text-gray-500 flex items-center">
                                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                                                <span className="truncate">{formatDate(event.date)}</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-4 sm:p-5 md:p-6 pt-0">
                                            <p className="text-gray-600 text-responsive-sm leading-relaxed line-clamp-3">{event.description}</p>
                                        </CardContent>
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
