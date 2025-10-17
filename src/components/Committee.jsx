'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, Github, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Committee() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);

    useEffect(() => {
        fetchCommitteeMembers();
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (!isAutoSliding || members.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const maxSlides = Math.ceil(members.length / 4) - 1;
                return prev < maxSlides ? prev + 1 : 0;
            });
        }, 4000); // Auto-advance every 4 seconds

        return () => clearInterval(interval);
    }, [isAutoSliding, members.length]);

    // Slider navigation functions
    const nextSlide = () => {
        const maxSlides = Math.ceil(members.length / 4) - 1;
        setCurrentSlide((prev) => (prev < maxSlides ? prev + 1 : 0));
        setIsAutoSliding(false); // Stop auto-sliding when user manually navigates
    };

    const prevSlide = () => {
        const maxSlides = Math.ceil(members.length / 4) - 1;
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlides));
        setIsAutoSliding(false); // Stop auto-sliding when user manually navigates
    };

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
        setIsAutoSliding(false); // Stop auto-sliding when user manually navigates
    };

    const handleMouseEnter = () => {
        setIsAutoSliding(false); // Pause auto-sliding on hover
    };

    const handleMouseLeave = () => {
        setIsAutoSliding(true); // Resume auto-sliding when mouse leaves
    };

    const fetchCommitteeMembers = async () => {
        try {
            const response = await fetch('/api/committee');
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            } else {
                // Fallback data if API fails
                setMembers(getFallbackMembers());
            }
        } catch (error) {
            console.error('Error fetching committee members:', error);
            setMembers(getFallbackMembers());
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
            linkedin: "https://linkedin.com/in/sarahjohnson"
        },
        {
            id: 2,
            name: "Michael Chen",
            designation: "Vice President",
            photo: null,
            bio: "Software Engineering major specializing in mobile app development. Led multiple successful hackathon projects.",
            email: "michael.chen@nextcode.com",
            linkedin: "https://linkedin.com/in/michaelchen"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            designation: "Tech Lead",
            photo: null,
            bio: "Cybersecurity enthusiast with expertise in web security and ethical hacking. Organizes monthly security workshops.",
            email: "emily.rodriguez@nextcode.com",
            linkedin: "https://linkedin.com/in/emilyrodriguez"
        },
        {
            id: 4,
            name: "David Kim",
            designation: "Events Coordinator",
            photo: null,
            bio: "Data Science major with strong background in Python and R. Coordinates all club events and workshops.",
            email: "david.kim@nextcode.com",
            linkedin: "https://linkedin.com/in/davidkim"
        },
        {
            id: 5,
            name: "Lisa Wang",
            designation: "Marketing Lead",
            photo: null,
            bio: "UI/UX Design specialist with experience in React and Figma. Manages all club communications and social media.",
            email: "lisa.wang@nextcode.com",
            linkedin: "https://linkedin.com/in/lisawang"
        },
        {
            id: 6,
            name: "Alex Thompson",
            designation: "Treasurer",
            photo: null,
            bio: "Business and Computer Science double major. Manages club finances and sponsorships.",
            email: "alex.thompson@nextcode.com",
            linkedin: "https://linkedin.com/in/alexthompson"
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Management <span className='text-orange-800 animate-pulse'>Committee</span></h2>
                    <p className="text-base sm:text-lg md:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                        Meet the dedicated team of students who lead NextCode and work tirelessly
                        to create amazing experiences for our community.
                    </p>
                </div>

                {/* Slider Container */}
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-600" />
                    </button>

                    {/* Slider Content */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {Array.from({ length: Math.ceil(members.length / 4) }).map((_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 py-5 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                                        {members.slice(slideIndex * 4, (slideIndex + 1) * 4).map((member) => (
                                            <div
                                                key={member.id}
                                                className="bg-white border border-orange-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group"
                                            >
                                                {/* Profile Image */}
                                                <div className="text-center mb-4 sm:mb-6">
                                                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4">
                                                        <AvatarImage src={member.photo} alt={member.name} />
                                                        <AvatarFallback className="text-lg sm:text-xl lg:text-2xl font-semibold bg-blue-100 text-blue-600">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">{member.name}</h3>
                                                    <Badge variant="secondary" className="bg-orange-800 text-white text-xs sm:text-sm">
                                                        {member.designation}
                                                    </Badge>
                                                </div>

                                                {/* Bio */}
                                                <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6">
                                                    {member.bio}
                                                </p>

                                                {/* Social Links */}
                                                <div className="flex justify-center space-x-3 sm:space-x-4">
                                                    {member.email && (
                                                        <a
                                                            href={`mailto:${member.email}`}
                                                            className="text-gray-400 hover:text-blue-600 transition-colors"
                                                            title="Email"
                                                        >
                                                            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </a>
                                                    )}
                                                    {member.linkedin && (
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-blue-600 transition-colors"
                                                            title="LinkedIn"
                                                        >
                                                            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </a>
                                                    )}
                                                    {member.github && (
                                                        <a
                                                            href={member.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                                            title="GitHub"
                                                        >
                                                            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.ceil(members.length / 4) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-orange-800 scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>



            </div>
        </section>
    );
}
