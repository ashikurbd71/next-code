'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Trash2, Eye, Mail, Building, Calendar, MessageSquare, GraduationCap, Hash, Phone, User, BookOpen, Clock, Search, Filter } from 'lucide-react';
import { parseSkills } from '@/lib/utils';

export default function StudentManagement({ students, onApproveStudent, onDeleteStudent }) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [semesterFilter, setSemesterFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const openDetailModal = (student) => {
        setSelectedStudent(student);
        setIsDetailModalOpen(true);
    };

    // Get unique departments and semesters for filter options
    const departments = [...new Set(students.map(s => s.department).filter(Boolean))];
    const semesters = [...new Set(students.map(s => s.semester).filter(Boolean))];

    // Filter students based on search and filters
    const filteredStudents = students.filter(student => {
        const matchesSearch = searchTerm === '' ||
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
        const matchesSemester = semesterFilter === 'all' || student.semester === semesterFilter;
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'approved' && student.approved) ||
            (statusFilter === 'pending' && !student.approved);

        return matchesSearch && matchesDepartment && matchesSemester && matchesStatus;
    });

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold">Student Management</h2>
                <div className="text-sm text-gray-600">
                    {filteredStudents.filter(s => !s.approved).length} pending approval
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white p-3 sm:p-4 rounded-lg border space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Filter className="h-4 w-4" />
                    Search & Filter
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Department Filter */}
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Semester Filter */}
                    <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Semesters" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Semesters</SelectItem>
                            {semesters.map((semester) => (
                                <SelectItem key={semester} value={semester}>
                                    {semester}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Showing {filteredStudents.length} of {students.length} students
                    </span>
                    {(searchTerm || departmentFilter !== 'all' || semesterFilter !== 'all' || statusFilter !== 'all') && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setSearchTerm('');
                                setDepartmentFilter('all');
                                setSemesterFilter('all');
                                setStatusFilter('all');
                            }}
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid gap-3 sm:gap-4">
                {filteredStudents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No students found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    filteredStudents.map((student) => (
                        <Card key={student.id}>
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                            <h3 className="text-base sm:text-lg font-semibold">{student.name}</h3>
                                            <Badge variant={student.approved ? "default" : "secondary"} className="w-fit">
                                                {student.approved ? "Approved" : "Pending"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm sm:text-base text-gray-600 mb-2 break-all">{student.email}</p>
                                        <p className="text-xs sm:text-sm text-gray-500 mb-2">{student.department}</p>

                                        <div className="flex flex-wrap gap-1">
                                            {parseSkills(student.skills).map((skill) => (
                                                <Badge key={skill} variant="outline" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        {student.message && (
                                            <p className="text-sm text-gray-600 mt-2 italic">"{student.message}"</p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 sm:ml-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openDetailModal(student)}
                                            className="flex-1 sm:flex-none"
                                        >
                                            <Eye className="h-4 w-4 sm:mr-2" />
                                            <span className="sm:hidden">View</span>
                                        </Button>
                                        {!student.approved && (
                                            <Button
                                                size="sm"
                                                onClick={() => onApproveStudent(student.id)}
                                                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                                            >
                                                <Check className="h-4 w-4 sm:mr-2" />
                                                <span className="sm:hidden">Approve</span>
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => onDeleteStudent(student.id)}
                                            className="flex-1 sm:flex-none"
                                        >
                                            <Trash2 className="h-4 w-4 sm:mr-2" />
                                            <span className="sm:hidden">Delete</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Student Detail Modal */}
            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Student Details
                        </DialogTitle>
                        <DialogDescription>
                            Complete information about the student
                        </DialogDescription>
                    </DialogHeader>

                    {selectedStudent && (
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {selectedStudent.profilePicture && (
                                            <img
                                                src={selectedStudent.profilePicture}
                                                alt={selectedStudent.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        )}
                                        <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                                    </div>
                                    <Badge variant={selectedStudent.approved ? "default" : "secondary"}>
                                        {selectedStudent.approved ? "Approved" : "Pending"}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{selectedStudent.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Building className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Department</p>
                                            <p className="font-medium">{selectedStudent.department}</p>
                                        </div>
                                    </div>

                                    {selectedStudent.studentId && (
                                        <div className="flex items-center gap-3">
                                            <Hash className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Student ID</p>
                                                <p className="font-medium">{selectedStudent.studentId}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedStudent.rollNumber && (
                                        <div className="flex items-center gap-3">
                                            <Hash className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Roll Number</p>
                                                <p className="font-medium">{selectedStudent.rollNumber}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedStudent.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-medium">{selectedStudent.phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedStudent.semester && (
                                        <div className="flex items-center gap-3">
                                            <GraduationCap className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Semester</p>
                                                <p className="font-medium">{selectedStudent.semester}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedStudent.session && (
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Session</p>
                                                <p className="font-medium">{selectedStudent.session}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedStudent.gender && (
                                        <div className="flex items-center gap-3">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Gender</p>
                                                <p className="font-medium">{selectedStudent.gender}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Joined</p>
                                            <p className="font-medium">
                                                {new Date(selectedStudent.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {selectedStudent.updatedAt && (
                                        <div className="flex items-center gap-3">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Last Updated</p>
                                                <p className="font-medium">
                                                    {new Date(selectedStudent.updatedAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="space-y-3">
                                <h4 className="font-medium">Skills & Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {parseSkills(selectedStudent.skills).map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-sm">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            {selectedStudent.message && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-gray-500" />
                                        <h4 className="font-medium">Message</h4>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700 italic">"{selectedStudent.message}"</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                {!selectedStudent.approved && (
                                    <Button
                                        onClick={() => {
                                            onApproveStudent(selectedStudent.id);
                                            setIsDetailModalOpen(false);
                                        }}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve Student
                                    </Button>
                                )}
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        onDeleteStudent(selectedStudent.id);
                                        setIsDetailModalOpen(false);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Student
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
