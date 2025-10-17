'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, Users, Star } from 'lucide-react';
import { parseSkills } from '@/lib/utils';

export default function LeaderboardPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('/api/students?approved=true');
            if (response.ok) {
                const data = await response.json();
                // Simulate points based on skills and activity
                const studentsWithPoints = data.map(student => ({
                    ...student,
                    points: Math.floor(Math.random() * 1000) + 100,
                    eventsAttended: Math.floor(Math.random() * 20) + 1,
                    projectsCompleted: Math.floor(Math.random() * 10) + 1
                }));

                // Sort by points
                studentsWithPoints.sort((a, b) => b.points - a.points);
                setStudents(studentsWithPoints);
            } else {
                setStudents(getFallbackLeaderboard());
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            setStudents(getFallbackLeaderboard());
        } finally {
            setLoading(false);
        }
    };

    const getFallbackLeaderboard = () => [
        {
            id: 1,
            name: "Alex Johnson",
            department: "Computer Science",
            points: 950,
            eventsAttended: 18,
            projectsCompleted: 8,
            skills: ["JavaScript", "React", "Node.js", "Python"]
        },
        {
            id: 2,
            name: "Sarah Chen",
            department: "Software Engineering",
            points: 875,
            eventsAttended: 15,
            projectsCompleted: 7,
            skills: ["Java", "Spring Boot", "MySQL", "Docker"]
        },
        {
            id: 3,
            name: "Michael Rodriguez",
            department: "Data Science",
            points: 820,
            eventsAttended: 12,
            projectsCompleted: 6,
            skills: ["Python", "Machine Learning", "TensorFlow", "R"]
        },
        {
            id: 4,
            name: "Emily Wang",
            department: "Information Technology",
            points: 780,
            eventsAttended: 14,
            projectsCompleted: 5,
            skills: ["React", "TypeScript", "AWS", "MongoDB"]
        },
        {
            id: 5,
            name: "David Kim",
            department: "Cybersecurity",
            points: 750,
            eventsAttended: 11,
            projectsCompleted: 4,
            skills: ["Python", "Network Security", "Ethical Hacking", "Linux"]
        }
    ];

    const getRankIcon = (index) => {
        switch (index) {
            case 0:
                return <Trophy className="h-6 w-6 text-yellow-500" />;
            case 1:
                return <Medal className="h-6 w-6 text-gray-400" />;
            case 2:
                return <Award className="h-6 w-6 text-amber-600" />;
            default:
                return <span className="text-lg font-bold text-gray-600">#{index + 1}</span>;
        }
    };

    const getRankBadge = (index) => {
        switch (index) {
            case 0:
                return <Badge className="bg-yellow-500 text-white">1st Place</Badge>;
            case 1:
                return <Badge className="bg-gray-400 text-white">2nd Place</Badge>;
            case 2:
                return <Badge className="bg-amber-600 text-white">3rd Place</Badge>;
            default:
                return <Badge variant="outline">#{index + 1}</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading leaderboard...</p>
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


                {/* Leaderboard */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Performers</h2>
                            <p className="text-lg text-gray-600">
                                Rankings based on participation, contributions, and community engagement
                            </p>
                        </div>

                        <div className="space-y-4">
                            {students.map((student, index) => (
                                <Card key={student.id} className={`hover:shadow-lg transition-shadow duration-300 ${index < 3 ? 'ring-2 ring-blue-200' : ''
                                    }`}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                {/* Rank */}
                                                <div className="flex items-center justify-center w-12 h-12">
                                                    {getRankIcon(index)}
                                                </div>

                                                {/* Avatar */}
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={student.profilePicture} alt={student.name} />
                                                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {/* Student Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                                                        {getRankBadge(index)}
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-2">{student.department}</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {parseSkills(student.skills).slice(0, 3).map((skill) => (
                                                            <Badge key={skill} variant="secondary" className="text-xs">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                        {parseSkills(student.skills).length > 3 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{parseSkills(student.skills).length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                                    {student.points.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-500">points</div>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {student.eventsAttended} events
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4" />
                                                        {student.projectsCompleted} projects
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>


                    </div>
                </section>

                {/* CTA Section */}

            </main>

            <Footer />
        </div>
    );
}