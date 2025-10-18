'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, Github, Facebook } from 'lucide-react';

export default function Committee() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCommitteeMembers();
    }, []);

    const fetchCommitteeMembers = async () => {
        try {
            const response = await fetch('/api/committee');
            if (response.ok) {
                const data = await response.json();
                // Sort by order field, then by createdAt as fallback
                const sortedData = data.sort((a, b) => {
                    if (a.order !== b.order) {
                        return (a.order || 0) - (b.order || 0);
                    }
                    return new Date(a.createdAt) - new Date(b.createdAt);
                });
                setMembers(sortedData);
            } else {
                // Fallback data if API fails
                const fallbackData = getFallbackMembers();
                // Sort fallback data by order
                const sortedFallback = fallbackData.sort((a, b) => (a.order || 0) - (b.order || 0));
                setMembers(sortedFallback);
            }
        } catch (error) {
            console.error('Error fetching committee members:', error);
            const fallbackData = getFallbackMembers();
            // Sort fallback data by order
            const sortedFallback = fallbackData.sort((a, b) => (a.order || 0) - (b.order || 0));
            setMembers(sortedFallback);
        } finally {
            setLoading(false);
        }
    };

    const getFallbackMembers = () => [
        {
            id: 1,
            name: "Sarah Johnson",
            designation: "President",
            photo: null,
            bio: "Computer Science senior with 3+ years of experience in full-stack development. Passionate about AI and machine learning.",
            email: "sarah.johnson@nextcode.com",
            linkedin: "https://linkedin.com/in/sarahjohnson",
            facebookLink: "https://facebook.com/sarahjohnson",
            semester: "8th Semester",
            department: "Computer Science & Technology",
            order: 1
        },
        {
            id: 2,
            name: "Michael Chen",
            designation: "Vice President",
            photo: null,
            bio: "Software Engineering major specializing in mobile app development. Led multiple successful hackathon projects.",
            email: "michael.chen@nextcode.com",
            linkedin: "https://linkedin.com/in/michaelchen",
            facebookLink: "https://facebook.com/michaelchen",
            semester: "7th Semester",
            department: "Computer Science & Technology",
            order: 2
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            designation: "Tech Lead",
            photo: null,
            bio: "Cybersecurity enthusiast with expertise in web security and ethical hacking. Organizes monthly security workshops.",
            email: "emily.rodriguez@nextcode.com",
            linkedin: "https://linkedin.com/in/emilyrodriguez",
            facebookLink: "https://facebook.com/emilyrodriguez",
            semester: "6th Semester",
            department: "Computer Science & Technology",
            order: 3
        },
        {
            id: 4,
            name: "David Kim",
            designation: "Events Coordinator",
            photo: null,
            bio: "Data Science major with strong background in Python and R. Coordinates all club events and workshops.",
            email: "david.kim@nextcode.com",
            linkedin: "https://linkedin.com/in/davidkim",
            facebookLink: "https://facebook.com/davidkim",
            semester: "5th Semester",
            department: "Computer Science & Technology",
            order: 4
        },
        {
            id: 5,
            name: "Lisa Wang",
            designation: "Marketing Lead",
            photo: null,
            bio: "UI/UX Design specialist with experience in React and Figma. Manages all club communications and social media.",
            email: "lisa.wang@nextcode.com",
            linkedin: "https://linkedin.com/in/lisawang",
            facebookLink: "https://facebook.com/lisawang",
            semester: "4th Semester",
            department: "Computer Science & Technology",
            order: 5
        },
        {
            id: 6,
            name: "Alex Thompson",
            designation: "Treasurer",
            photo: null,
            bio: "Business and Computer Science double major. Manages club finances and sponsorships.",
            email: "alex.thompson@nextcode.com",
            linkedin: "https://linkedin.com/in/alexthompson",
            facebookLink: "https://facebook.com/alexthompson",
            semester: "3rd Semester",
            department: "Computer Science & Technology",
            order: 6
        }
    ];

    if (loading) {
        return (
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Management Committee</h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-22">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Management <span className='text-orange-800 animate-pulse'>Committee</span></h2>
                    <p className="text-base sm:text-lg md:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                        Meet the dedicated team of students who lead NextCode and work tirelessly
                        to create amazing experiences for our community.
                    </p>
                </div>

                {/* Committee Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 group h-full flex flex-col relative overflow-hidden hover:scale-[1.02]"
                        >
                            {/* Enhanced decorative gradient overlay */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500"></div>

                            {/* Profile Image Section */}
                            <div className="text-center mb-6 flex-shrink-0">
                                <div className="relative inline-block">
                                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-4 ring-4 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300 shadow-lg">
                                        <AvatarImage src={member.photo} alt={member.name} />
                                        <AvatarFallback className="text-xl sm:text-2xl lg:text-2xl font-bold bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Leadership indicator */}
                                    {member.designation && (member.designation.toLowerCase().includes('president') || member.designation.toLowerCase().includes('vice')) && (
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">👑</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-800 transition-colors duration-300">
                                    {member.name}
                                </h3>

                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-4 py-2 rounded-full shadow-md mb-3 font-semibold">
                                    {member.designation}
                                </Badge>

                                {member.department && (
                                    <p className="text-sm text-gray-600 mb-1 font-medium">
                                        {member.department}
                                    </p>
                                )}
                                {member.semester && (
                                    <p className="text-sm text-gray-500">
                                        {member.semester}
                                    </p>
                                )}
                            </div>

                            {/* Enhanced Bio Section */}
                            <div className="flex-grow mb-6">
                                <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl p-4 border border-orange-100">
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-700 transition-colors duration-300">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Enhanced Social Links */}
                            <div className="flex justify-center space-x-3 pt-4 border-t border-gray-100">
                                {member.email && (
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 group/social shadow-sm hover:shadow-md"
                                        title="Email"
                                    >
                                        <Mail className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 group/social shadow-sm hover:shadow-md"
                                        title="LinkedIn"
                                    >
                                        <Linkedin className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                                    </a>
                                )}
                                {member.github && (
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-full transition-all duration-300 group/social shadow-sm hover:shadow-md"
                                        title="GitHub"
                                    >
                                        <Github className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                                    </a>
                                )}
                                {member.facebookLink && (
                                    <a
                                        href={member.facebookLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 group/social shadow-sm hover:shadow-md"
                                        title="Facebook"
                                    >
                                        <Facebook className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                                    </a>
                                )}
                            </div>

                            {/* Subtle corner accent */}
                            <div className="absolute top-4 left-4 w-2 h-2 bg-orange-400 rounded-full opacity-60"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
