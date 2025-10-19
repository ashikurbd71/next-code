'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Code, Trophy, Lightbulb, Upload, X, Camera } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

export default function JoinPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        phone: '',
        semester: '',
        session: '',
        gender: '',
        rollNumber: '',
        skills: [],
        message: '',
        profilePicture: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const { uploadImage, isUploading, uploadError, resetError } = useImageUpload();

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

    const sessions = [
        '19-20',
        '20-21',
        '21-22',
        '22-23',
        '23-24',
        '24-25',
        '25-26',
        '26-27',
        '27-28',
        '28-29',
        '29-30',
        '30-31'
    ];

    const genders = [
        'Male',
        'Female',
        'Other',
        'Prefer not to say'
    ];

    const availableSkills = [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'React', 'Vue.js', 'Angular',
        'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel',
        'HTML/CSS', 'TypeScript', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL',
        'Git', 'Docker', 'AWS', 'Azure', 'Machine Learning', 'Data Science',
        'Mobile Development', 'iOS', 'Android', 'React Native', 'Flutter',
        'UI/UX Design', 'Figma', 'Adobe XD', 'Web Development', 'DevOps',
        'Cybersecurity', 'Network Security', 'Ethical Hacking', 'Linux',
        'Blockchain', 'Web3', 'Game Development', 'Unity', 'Unreal Engine'
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
    };

    const handleSkillToggle = (skill) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setProfilePicturePreview(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload image
        const uploadResult = await uploadImage(file);
        if (uploadResult) {
            setFormData(prev => ({
                ...prev,
                profilePicture: uploadResult.url
            }));
        }
    };

    const removeProfilePicture = () => {
        setFormData(prev => ({
            ...prev,
            profilePicture: null
        }));
        setProfilePicturePreview(null);
        resetError();
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.department) {
            newErrors.department = 'Department is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.semester) {
            newErrors.semester = 'Semester is required';
        }

        if (!formData.session) {
            newErrors.session = 'Session is required';
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        if (!formData.rollNumber.trim()) {
            newErrors.rollNumber = 'Roll number is required';
        }

        if (formData.skills.length === 0) {
            newErrors.skills = 'Please select at least one skill';
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
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    department: '',
                    phone: '',
                    semester: '',
                    session: '',
                    gender: '',
                    rollNumber: '',
                    skills: [],
                    message: '',
                    profilePicture: null
                });
                setProfilePicturePreview(null);
            } else {
                const errorData = await response.json();

                // Handle specific error cases
                if (response.status === 409) {
                    if (errorData.error === 'Student with this email already exists') {
                        setErrors({
                            submit: 'An application with this email address has already been submitted. Please use a different email or contact us if you believe this is an error.',
                            email: 'This email is already registered'
                        });
                    } else if (errorData.error === 'Email already exists') {
                        setErrors({
                            submit: 'This email address is already registered. Please use a different email.',
                            email: 'This email is already registered'
                        });
                    } else if (errorData.error === 'Student ID conflict') {
                        setErrors({ submit: 'There was a technical issue. Please try submitting your application again.' });
                    } else {
                        setErrors({ submit: errorData.details || 'This email is already registered. Please use a different email.' });
                    }
                } else {
                    setErrors({ submit: errorData.details || 'Failed to submit application. Please try again.' });
                }
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            setErrors({ submit: 'Network error. Please check your connection and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <main className="py-24">
                    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
                        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
                                <p className="text-lg text-gray-600 mb-6">
                                    Thank you for your interest in joining NextCode! Your application has been received
                                    and is currently under review by our committee.
                                </p>
                                <p className="text-gray-600 mb-8">
                                    We&apos;ll review your application and get back to you within 3-5 business days.
                                    In the meantime, feel free to explore our events and community.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild>
                                        <a href="/events">View Events</a>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <a href="/talent">Meet Our Members</a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">

            <Navbar />
            <main className="">

                {/* Registration Form */}
                <section className=" bg-gray-50 md:py-34  py-24">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">Application Form</CardTitle>
                                <CardDescription className="text-center">
                                    Fill out the form below to apply for membership
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className='space-y-4'>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {/* Name */}
                                        <div>
                                            <Label className='pb-2' htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={errors.name ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md'}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <Label className='pb-2' htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={errors.email ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md'}
                                                placeholder="Enter your email address"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>



                                        {/* Phone */}
                                        <div>
                                            <Label className='pb-2' htmlFor="phone">Phone Number *</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className={errors.phone ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md'}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>



                                        {/* Roll Number */}
                                        <div>
                                            <Label className='pb-2' htmlFor="rollNumber">Roll Number *</Label>
                                            <Input
                                                id="rollNumber"
                                                type="text"
                                                value={formData.rollNumber}
                                                onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                                                className={errors.rollNumber ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md'}
                                                placeholder="Enter your roll number"
                                            />
                                            {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                                        </div>

                                        {/* Department */}
                                        <div className=''>
                                            <Label className='pb-2' htmlFor="department">Department *</Label>
                                            <Select className='' value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                                                <SelectTrigger className={`${errors.department ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md'} w-full`}>
                                                    <SelectValue placeholder="Select your department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments.map((dept) => (
                                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                                        </div>


                                        <div>
                                            <Label className='pb-2' htmlFor="semester">Semester *</Label>
                                            <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                                                <SelectTrigger className={`${errors.semester ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md'} w-full`}>
                                                    <SelectValue placeholder="Select semester" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {semesters.map((sem) => (
                                                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
                                        </div>

                                        <div>
                                            <Label className='pb-2' htmlFor="session">Session *</Label>
                                            <Select value={formData.session} onValueChange={(value) => handleInputChange('session', value)}>
                                                <SelectTrigger className={`${errors.session ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md'} w-full`}>
                                                    <SelectValue placeholder="Select session" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sessions.map((sess) => (
                                                        <SelectItem key={sess} value={sess}>{sess}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.session && <p className="text-red-500 text-sm mt-1">{errors.session}</p>}
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <Label className='pb-2' htmlFor="gender">Gender *</Label>
                                            <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                                                <SelectTrigger className={`${errors.gender ? 'border-red-500' : 'py-2 border-2 border-gray-300 rounded-md   '} w-full`}>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {genders.map((gen) => (
                                                        <SelectItem key={gen} value={gen}>{gen}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                                        </div>

                                    </div>

                                    {/* Profile Picture Upload */}
                                    <div>
                                        <Label className='pb-2'>Profile Picture (Optional)</Label>
                                        <div className="space-y-3">
                                            {profilePicturePreview ? (
                                                <div className="relative inline-block">
                                                    <img
                                                        src={profilePicturePreview}
                                                        alt="Profile preview"
                                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeProfilePicture}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-4">
                                                    <label
                                                        htmlFor="profilePicture"
                                                        className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                                                    >
                                                        <Camera className="h-5 w-5 text-gray-500" />
                                                        <span className="text-sm text-gray-600">
                                                            {isUploading ? 'Uploading...' : 'Choose Photo'}
                                                        </span>
                                                    </label>
                                                    <input
                                                        id="profilePicture"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleProfilePictureChange}
                                                        className="hidden"
                                                        disabled={isUploading}
                                                    />
                                                </div>
                                            )}
                                            {uploadError && (
                                                <p className="text-red-500 text-sm">{uploadError}</p>
                                            )}
                                            <p className="text-xs text-gray-500">
                                                Supported formats: JPG, PNG, GIF. Max size: 32MB
                                            </p>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <Label className='pb-2'>Skills & Technologies *</Label>
                                        <p className="text-sm text-gray-600 mb-3">Select all that apply (minimum 1 required)</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                                            {availableSkills.map((skill) => (
                                                <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.skills.includes(skill)}
                                                        onChange={() => handleSkillToggle(skill)}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <span className="text-sm">{skill}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                                        <p className="text-sm text-gray-500 mt-2">
                                            Selected: {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <Label className='pb-2' htmlFor="message">Tell us about yourself (Optional)</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            placeholder="Share your interests, goals, or why you want to join NextCode..."
                                            rows={4}
                                        />
                                    </div>

                                    {/* Submit Error */}
                                    {errors.submit && (
                                        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-800 hover:bg-orange-700"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
}
