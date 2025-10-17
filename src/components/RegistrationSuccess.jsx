'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Users, MessageCircle, Calendar, MapPin } from 'lucide-react';

export default function RegistrationSuccess({ event, registration }) {
    const [groupLink, setGroupLink] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroupLink = async () => {
            try {
                if (registration?.groupLinkId) {
                    const response = await fetch(`/api/group-links/${registration.groupLinkId}`);
                    if (response.ok) {
                        const link = await response.json();
                        setGroupLink(link);
                    }
                } else if (event?.id) {
                    // If no specific group link, try to get any group link for this event
                    const response = await fetch(`/api/group-links?eventId=${event.id}`);
                    if (response.ok) {
                        const links = await response.json();
                        if (links.length > 0) {
                            setGroupLink(links[0]); // Use the first available group link
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching group link:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupLink();
    }, [event?.id, registration?.groupLinkId]);

    const handleJoinGroup = () => {
        if (groupLink?.url) {
            window.open(groupLink.url, '_blank');
        }
    };

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

    const getPlatformIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'whatsapp':
                return <MessageCircle className="h-5 w-5" />;
            case 'telegram':
                return <MessageCircle className="h-5 w-5" />;
            case 'discord':
                return <MessageCircle className="h-5 w-5" />;
            default:
                return <ExternalLink className="h-5 w-5" />;
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

    return (
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
            {/* Success Message */}
            <div className="text-center py-6 sm:py-8 mobile-spacing-base">
                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
                <h1 className="mobile-heading-responsive font-bold text-gray-900 mb-2">Registration Successful!</h1>
                <p className="mobile-text-responsive text-gray-600">
                    Thank you for registering for <strong>{event?.title}</strong>.
                </p>
                <p className="mobile-text-responsive text-gray-500 mt-2">
                    We'll review your application and send you a confirmation email soon.
                </p>
            </div>

            {/* Event Details */}
            {event && (
                <Card className="mobile-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 mobile-subheading-responsive">
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                            Event Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <h3 className="font-semibold mobile-text-responsive">{event.title}</h3>
                            <p className="mobile-text-responsive text-gray-600">{event.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="mobile-text-responsive">{formatDate(event.date)}</span>
                        </div>
                        {event.location && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span className="mobile-text-responsive">{event.location}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Group Link Section */}
            {loading ? (
                <Card className="mobile-card">
                    <CardContent className="py-6 sm:py-8">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="mobile-text-responsive text-gray-600">Loading group information...</p>
                        </div>
                    </CardContent>
                </Card>
            ) : groupLink ? (
                <Card className="border-green-200 bg-green-50 mobile-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800 mobile-subheading-responsive">
                            {getPlatformIcon(groupLink.platform)}
                            Join the {getPlatformName(groupLink.platform)} Group
                        </CardTitle>
                        <CardDescription className="text-green-700 mobile-text-responsive">
                            Connect with other participants and get event updates
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {groupLink.description && (
                            <p className="text-green-700 mobile-text-responsive">{groupLink.description}</p>
                        )}

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-green-700">
                                <Users className="h-4 w-4" />
                                <span className="mobile-text-responsive">
                                    {groupLink.currentMembers} members
                                    {groupLink.maxMembers && ` / ${groupLink.maxMembers} max`}
                                </span>
                            </div>

                            {groupLink.joinCode && (
                                <div className="text-sm text-green-600">
                                    Join Code: <span className="font-mono font-semibold">{groupLink.joinCode}</span>
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleJoinGroup}
                            className="w-full bg-green-600 hover:bg-green-700 text-white mobile-button mobile-tap-highlight"
                            size="lg"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Join {getPlatformName(groupLink.platform)} Group
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-gray-200 mobile-card">
                    <CardContent className="py-6 sm:py-8 text-center">
                        <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="mobile-subheading-responsive font-semibold text-gray-700 mb-2">No Group Available</h3>
                        <p className="mobile-text-responsive text-gray-600">
                            There's no group link available for this event yet.
                            Check back later or contact the organizers for group information.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                    variant="outline"
                    onClick={() => window.location.href = '/events'}
                    className="flex-1 mobile-button mobile-tap-highlight"
                >
                    Back to Events
                </Button>
                <Button
                    onClick={() => window.location.href = '/'}
                    className="flex-1 mobile-button mobile-tap-highlight"
                >
                    Go to Home
                </Button>
            </div>
        </div>
    );
}
