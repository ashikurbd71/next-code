'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function EventRegistrationForm({ event, onRegistrationSuccess }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        department: '',
        phone: '',
        semester: '',
        instituteName: '',
        motivation: ''
    });
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);

    const departments = [
        "Computer Science & Technology",
        "Electrical Technology",
        "Electronics Technology",
        "Instrumentation & Process Control Technology",
        "Electromedical Technology",
        "Power Technology",
        "Civil Technology",
        "Architecture and Interior Design Technology",
        "Construction Technology",
        "Environmental Technology",
        "Survey Technology",
        "Mechanical Technology",
        "Automobile Technology",
        "Refrigeration & Air Conditioning (RAC) Technology",
        "Marine Engineering Technology",
        "Shipbuilding Technology",
        "Chemical Technology",
        "Food Technology",
        "Glass Technology",
        "Ceramics Technology",
        "Printing Technology",
        "Leather Technology",
        "Textile Technology",
        "Garments Design & Pattern Making Technology",
        "Mining and Mine Survey Technology",
        "Petroleum and Chemical Refinery Technology",
        "Laboratory Medical Technology",
        "Pharmacy Technology",
        "Radiography & Imaging Technology",
        "Aeronautical Technology",
        "Aircraft Maintenance Technology",
        "Aviation Engineering Technology",
        "Computer-Aided Design and Drafting (CADD)",
        "Mechatronics Technology",
        "Renewable Energy Technology",
        "Power Engineering Technology",
        'Other'
    ];

    const semesters = [
        '1st Semester',
        '2nd Semester',
        '3rd Semester',
        '4th Semester',
        '5th Semester',
        '6th Semester',
        '7th Semester',
        '8th Semester'
    ];


    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        // Auto-fill form when email is entered and student exists
        if (field === 'email' && value.includes('@')) {
            checkStudentExists(value);
        }
    };

    const checkStudentExists = async (email) => {
        setIsCheckingEmail(true);
        try {
            const response = await fetch(`/api/students?email=${encodeURIComponent(email)}`);
            if (response.ok) {
                const students = await response.json();
                if (students.length > 0) {
                    const student = students[0];
                    setFormData(prev => ({
                        ...prev,
                        name: student.name || '',
                        department: student.department || '',
                        phone: student.phone || '',
                        semester: student.semester || '',
                        instituteName: student.instituteName || ''
                    }));
                    setEmailChecked(true);
                } else {
                    // Clear form if student not found
                    setFormData(prev => ({
                        ...prev,
                        name: '',
                        department: '',
                        phone: '',
                        semester: '',
                        instituteName: ''
                    }));
                    setEmailChecked(false);
                }
            }
        } catch (error) {
            console.error('Error checking student:', error);
        } finally {
            setIsCheckingEmail(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }


        if (!formData.motivation.trim()) {
            newErrors.motivation = 'Please tell us why you want to attend this event';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Create the event registration directly
            const registrationResponse = await fetch('/api/event-registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    department: formData.department,
                    phone: formData.phone,
                    semester: formData.semester,
                    eventId: event.id,
                    instituteName: formData.instituteName,
                    notes: `Motivation: ${formData.motivation}`
                }),
            });

            if (registrationResponse.ok) {
                const registrationData = await registrationResponse.json();

                // Redirect to success page with registration ID
                const successUrl = `/register/${event.id}/success?registrationId=${registrationData.id}`;
                window.location.href = successUrl;
            } else {
                const error = await registrationResponse.json();
                if (error.error === 'Already registered for this event') {
                    setErrors({ submit: 'You are already registered for this event!' });
                } else {
                    setErrors({ submit: 'Failed to register for the event. Please try again.' });
                }
            }
        } catch (error) {
            console.error('Error registering for event:', error);
            setErrors({ submit: 'Failed to register for the event. Please try again.' });
        } finally {
            setIsSubmitting(false);
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


    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="mobile-spacing-base">
                <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">Register for <span className="text-orange-800 animate-pulse">{event.title}</span></h2>
                <p className="mobile-text-responsive text-gray-600">
                    Fill out the form below to register for this event. All fields marked with * are required.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Input - Primary Field */}
                <div className="space-y-4">
                    <h3 className="mobile-subheading-responsive font-semibold">Student Information</h3>

                    <div>
                        <Label className='pb-2' htmlFor="email">Email Address *</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`mobile-form-input ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Enter your email address"
                            />
                            {isCheckingEmail && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                </div>
                            )}
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        {emailChecked && (
                            <p className="text-green-600 text-sm mt-1">✓ Your Are Our NextCode Talent</p>
                        )}
                    </div>

                    {/* Auto-filled Information */}
                    <div className="grid mobile-grid-1 gap-4">
                        <div>
                            <Label className='pb-2' htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter your full name"
                                readOnly={emailChecked}
                                className={`mobile-form-input ${emailChecked ? 'bg-gray-50' : ''}`}
                            />
                        </div>
                    </div>

                    <div className="grid mobile-grid-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className='pb-2' htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="Enter your phone number"
                                readOnly={emailChecked}
                                className={`mobile-form-input ${emailChecked ? 'bg-gray-50' : ''}`}
                            />
                        </div>

                        <div>
                            <Label className='pb-2' htmlFor="department">Department</Label>
                            <Select
                                value={formData.department}
                                onValueChange={(value) => handleInputChange('department', value)}
                                disabled={emailChecked}
                            >
                                <SelectTrigger className={`mobile-form-input ${emailChecked ? 'bg-gray-50' : ''} w-full`}>
                                    <SelectValue placeholder="Select your department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid mobile-grid-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className='pb-2' htmlFor="semester">Semester</Label>
                            <Select
                                value={formData.semester}
                                onValueChange={(value) => handleInputChange('semester', value)}
                                disabled={emailChecked}
                            >
                                <SelectTrigger className={`mobile-form-input ${emailChecked ? 'bg-gray-50' : ''} w-full`}>
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {semesters.map((sem) => (
                                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className='pb-2' htmlFor="instituteName">Institute Name</Label>
                            <Input
                                id="instituteName"
                                value={formData.instituteName}
                                onChange={(e) => handleInputChange('instituteName', e.target.value)}
                                placeholder="Enter your institute name"
                                className="mobile-form-input"
                            />
                        </div>
                    </div>

                </div>

                {/* Event-Specific Information */}
                <div className="space-y-4">
                    <h3 className="mobile-subheading-responsive font-semibold">Event Information</h3>

                    <div>
                        <Label className='pb-2' htmlFor="motivation">Why do you want to attend this event? *</Label>
                        <Textarea
                            id="motivation"
                            value={formData.motivation}
                            onChange={(e) => handleInputChange('motivation', e.target.value)}
                            className={`mobile-form-input ${errors.motivation ? 'border-red-500' : ''}`}
                            placeholder="Tell us about your interest in this event..."
                            rows={3}
                        />
                        {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
                    </div>
                </div>


                {/* Submit Error */}
                {errors.submit && (
                    <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                        {errors.submit}
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.location.href = '/events'}
                        className="flex-1 mobile-button mobile-tap-highlight"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 mobile-button mobile-tap-highlight"
                    >
                        {isSubmitting ? 'Registering...' : 'Register for Event'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
