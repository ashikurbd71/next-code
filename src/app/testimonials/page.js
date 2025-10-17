'use client';

import { useState } from 'react';
import TestimonialForm from '@/components/TestimonialForm';

export default function TestimonialsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitTestimonial = async (formData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Show success message (you can add a toast notification here)
                alert('Testimonial added successfully!');
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to add testimonial'}`);
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            alert('Error submitting testimonial. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">


                {/* Testimonial Form */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="text-center mb-6 sm:mb-8 px-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                            Share Your Experience
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            Help other students by sharing your journey with NextCode. Your testimonial will inspire and guide future students in their career paths.
                        </p>
                    </div>
                    <div className="px-2 sm:px-0">
                        <TestimonialForm
                            onSubmit={handleSubmitTestimonial}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
