'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);


    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials?active=true');
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data);
            } else {
                setTestimonials(getFallbackTestimonials());
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setTestimonials(getFallbackTestimonials());
        }
    };



    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };


    console.log(testimonials)


    // Don't render if no testimonials are loaded yet
    if (!testimonials || testimonials.length === 0) {
        return (
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">What Our Students Say</h2>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                            Hear from our alumni who have gone on to work at top tech companies
                            and how NextCode helped shape their careers.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
                            <div className="text-center">
                                <div className="animate-pulse">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full mx-auto mb-4 sm:mb-6"></div>
                                    <div className="h-4 sm:h-6 bg-gray-200 rounded w-32 sm:w-48 mx-auto mb-2"></div>
                                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32 mx-auto mb-1"></div>
                                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-32 sm:w-40 mx-auto mb-6 sm:mb-8"></div>
                                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">What <span className='text-orange-800 animate-pulse'>Our Students</span> Say</h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                        Hear from our alumni who have gone on to work at top tech companies
                        and how NextCode helped shape their careers.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl border border-white/20">
                        {/* Enhanced Quote Icon */}
                        <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 text-blue-200/60">
                            <Quote className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full translate-y-12 -translate-x-12"></div>

                        {/* Testimonial Content */}
                        <div className="text-center relative z-10">
                            <div className="mb-6 sm:mb-8">
                                <div className="relative inline-block">
                                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 ring-4 ring-white/50 shadow-lg">
                                        <AvatarImage src={testimonials[currentIndex]?.photo} alt={testimonials[currentIndex]?.name} />
                                        <AvatarFallback className="text-lg sm:text-xl font-semibold bg-gradient-to-br from-orange-100 to-pink-100 text-orange-800">
                                            {testimonials[currentIndex]?.name ? testimonials[currentIndex]?.name?.split(' ').map((n) => n[0]).join('') : 'NC'}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Verified badge */}
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                                    {testimonials[currentIndex]?.name || 'Anonymous'}
                                </h3>
                                <p className="text-orange-800 font-semibold mb-1 text-sm sm:text-base lg:text-lg">
                                    {testimonials[currentIndex]?.role || 'Student'}
                                </p>
                                <p className="text-gray-500 text-xs sm:text-sm">
                                    {testimonials[currentIndex]?.department || 'Computer Science'} • NextCode Alumni
                                </p>
                            </div>

                            <blockquote className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed italic mb-6 sm:mb-8 px-2 bg-white/50 rounded-xl p-4 border border-white/30">
                                "{testimonials[currentIndex]?.content || 'Great experience with NextCode!'}"
                            </blockquote>
                        </div>

                        {/* Enhanced Navigation */}
                        <div className="flex justify-center items-center space-x-4 sm:space-x-6">
                            <button
                                onClick={prevTestimonial}
                                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                            </button>

                            {/* Enhanced Dots Indicator */}
                            <div className="flex space-x-3">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextTestimonial}
                                className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
