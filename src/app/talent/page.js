'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Search, Filter, Users, GraduationCap, Code, Mail, Hash, BookOpen } from 'lucide-react';
import { parseSkills } from '@/lib/utils';

export default function TalentPage() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedSkill, setSelectedSkill] = useState('all');

    const departments = [
        'Computer Science',
        'Software Engineering',
        'Information Technology',
        'Data Science',
        'Cybersecurity',
        'Computer Engineering'
    ];

    const skills = [
        'JavaScript',
        'Python',
        'React',
        'Node.js',
        'Java',
        'C++',
        'Machine Learning',
        'Web Development',
        'Mobile Development',
        'DevOps',
        'UI/UX Design',
        'Database Management'
    ];

    const fetchStudents = useCallback(async () => {
        try {
            const response = await fetch('/api/students?approved=true');
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            } else {
                setStudents(getFallbackStudents());
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            setStudents(getFallbackStudents());
        } finally {
            setLoading(false);
        }
    }, []);

    const filterStudents = useCallback(() => {
        let filtered = students;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                parseSkills(student.skills).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Department filter
        if (selectedDepartment !== 'all') {
            filtered = filtered.filter(student => student.department === selectedDepartment);
        }

        // Skill filter
        if (selectedSkill !== 'all') {
            filtered = filtered.filter(student => parseSkills(student.skills).includes(selectedSkill));
        }

        setFilteredStudents(filtered);
    }, [students, searchTerm, selectedDepartment, selectedSkill]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    useEffect(() => {
        filterStudents();
    }, [filterStudents]);

    const getFallbackStudents = () => [
        {
            id: 1,
            name: "Alex Johnson",
            email: "alex.johnson@gmail.com",
            department: "Computer Science",
            semester: "8th",
            rollNumber: "CS2021001",
            skills: ["JavaScript", "React", "Node.js", "Python"],
            profilePicture: null,
            approved: true
        },
        {
            id: 2,
            name: "Sarah Chen",
            email: "sarah.chen@gmail.com",
            department: "Software Engineering",
            semester: "7th",
            rollNumber: "SE2021002",
            skills: ["Java", "Spring Boot", "MySQL", "Docker"],
            profilePicture: null,
            approved: true
        },
        {
            id: 3,
            name: "Michael Rodriguez",
            email: "michael.rodriguez@gmail.com",
            department: "Data Science",
            semester: "6th",
            rollNumber: "DS2021003",
            skills: ["Python", "Machine Learning", "TensorFlow", "R"],
            profilePicture: null,
            approved: true
        },
        {
            id: 4,
            name: "Emily Wang",
            email: "emily.wang@gmail.com",
            department: "Information Technology",
            semester: "5th",
            rollNumber: "IT2021004",
            skills: ["React", "TypeScript", "AWS", "MongoDB"],
            profilePicture: null,
            approved: true
        },
        {
            id: 5,
            name: "David Kim",
            email: "david.kim@gmail.com",
            department: "Cybersecurity",
            semester: "4th",
            rollNumber: "CS2021005",
            skills: ["Python", "Network Security", "Ethical Hacking", "Linux"],
            profilePicture: null,
            approved: true
        },
        {
            id: 6,
            name: "Lisa Patel",
            email: "lisa.patel@gmail.com",
            department: "Computer Engineering",
            semester: "3rd",
            rollNumber: "CE2021006",
            skills: ["C++", "Embedded Systems", "Arduino", "IoT"],
            profilePicture: null,
            approved: true
        },
        {
            id: 7,
            name: "James Wilson",
            email: "james.wilson@gmail.com",
            department: "Computer Science",
            semester: "2nd",
            rollNumber: "CS2021007",
            skills: ["JavaScript", "Vue.js", "Firebase", "Web Development"],
            profilePicture: null,
            approved: true
        },
        {
            id: 8,
            name: "Maria Garcia",
            email: "maria.garcia@gmail.com",
            department: "Software Engineering",
            semester: "1st",
            rollNumber: "SE2021008",
            skills: ["Python", "Django", "PostgreSQL", "Docker"],
            profilePicture: null,
            approved: true
        }
    ];


    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading talent...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="">




                {/* Filters Section */}
                <section className="py-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                {/* Search */}
                                <div className="relative flex-1 lg:w-80">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search by name, department, or skill..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border border-orange-800"
                                    />
                                </div>

                                {/* Department Filter */}
                                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                    <SelectTrigger className="w-full sm:w-48 border border-orange-800">
                                        <SelectValue placeholder="Department" />
                                    </SelectTrigger>
                                    <SelectContent className='border border-orange-800'>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Skill Filter */}
                                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                                    <SelectTrigger className="w-full sm:w-48 border border-orange-800">
                                        <SelectValue placeholder="Skill" />
                                    </SelectTrigger>
                                    <SelectContent className='border border-orange-800'>
                                        <SelectItem value="all">All Skills</SelectItem>
                                        {skills.map((skill) => (
                                            <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="text-sm text-gray-600">
                                Showing {filteredStudents.length} of {students.length} members
                            </div>
                        </div>
                    </div>
                </section>

                {/* Students Grid */}
                <section className="py-20 bg-gray-50">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-22">
                        {filteredStudents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredStudents.map((student) => (
                                    <Card key={student.id} variant="glass" className="group p-5 h-[500px] hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col">
                                        {/* Decorative gradient top border */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800"></div>

                                        <CardHeader className="text-center pb-4 relative">
                                            <div className="relative inline-block">
                                                <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300">
                                                    <AvatarImage src={student.profilePicture} alt={student.name} />
                                                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800">
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>

                                            </div>
                                            <CardTitle className="text-lg group-hover:text-orange-800 transition-colors duration-300">{student.name}</CardTitle>
                                            <CardDescription className="flex items-center justify-center text-sm bg-gray-50 rounded-lg px-3 py-1">
                                                <GraduationCap className="h-4 w-4 mr-2 text-orange-600" />
                                                <span className="font-medium">{student.department}</span>
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex-1">
                                            <div className="space-y-4">
                                                {/* Student Info */}
                                                <div className="space-y-3">
                                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                                                        <BookOpen className="h-4 w-4 mr-3 text-orange-600 flex-shrink-0" />
                                                        <span className="font-medium">Semester:</span>
                                                        <span className="ml-2 text-gray-800">{student.semester || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                                                        <Hash className="h-4 w-4 mr-3 text-orange-600 flex-shrink-0" />
                                                        <span className="font-medium">Roll:</span>
                                                        <span className="ml-2 text-gray-800 font-mono text-xs">{student.rollNumber || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                                                        <Mail className="h-4 w-4 mr-3 text-orange-600 flex-shrink-0" />
                                                        <span className="font-medium">Email:</span>
                                                        <span className="ml-2 text-gray-800 truncate text-xs">{student.email || 'N/A'}</span>
                                                    </div>
                                                </div>

                                                {/* Skills */}
                                                <div className="pt-3 border-t border-gray-100">
                                                    <div className="flex items-center text-sm text-gray-600 mb-3">
                                                        <Code className="h-4 w-4 mr-2 text-orange-600" />
                                                        <span className="font-semibold">Skills</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 pb-5">
                                                        {parseSkills(student.skills).slice(0, 3).map((skill) => (
                                                            <Badge key={skill} variant="secondary" className="text-xs bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-0 hover:from-orange-200 hover:to-orange-300 transition-all duration-200">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                        {parseSkills(student.skills).length > 3 && (
                                                            <Badge variant="outline" className="text-xs border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-all duration-200">
                                                                +{parseSkills(student.skills).length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>

                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Members Found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-orange-800 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl font-bold mb-6">Want to Join Our Community?</h2>
                        <p className="text-md text-blue-100 mb-8">
                            Become part of our talented community and showcase your skills to the world.
                        </p>
                        <a
                            href="/join"
                            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                        >
                            Join NextCode
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
}
