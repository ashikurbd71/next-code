import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Student } from '@/lib/entities/Student';

// Mock data - in a real app, this would come from the database
const mockStudents = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        department: 'Computer Science',
        studentId: 'nextcode-ov-01',
        phone: '123-456-7890',
        semester: '8th',
        session: '2020-24',
        gender: 'Male',
        rollNumber: 'CS2020001',
        skills: 'JavaScript,React,Node.js',
        approved: false,
        profilePicture: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        department: 'Information Technology',
        studentId: 'nextcode-ov-02',
        phone: '098-765-4321',
        semester: '6th',
        session: '2021-25',
        gender: 'Female',
        rollNumber: 'IT2021001',
        skills: 'Python,Django,SQL',
        approved: true,
        profilePicture: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        department: 'Software Engineering',
        studentId: 'nextcode-ov-03',
        phone: '555-123-4567',
        semester: '4th',
        session: '2022-26',
        gender: 'Male',
        rollNumber: 'SE2022001',
        skills: 'Java,Spring Boot,MySQL',
        approved: false,
        profilePicture: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// GET single student
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const studentId = parseInt(id);

        const dataSource = await getDataSource();
        const studentRepository = dataSource.getRepository(Student);

        const student = await studentRepository.findOne({
            where: { id: studentId }
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
    }
}

// PATCH update student (partial update)
export async function PATCH(request, { params }) {
    try {
        // Parse request body
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
        }

        const { id } = await params;
        const studentId = parseInt(id);

        if (isNaN(studentId)) {
            return NextResponse.json({ error: 'Invalid student ID' }, { status: 400 });
        }

        // Validate that body is not empty
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ error: 'Request body cannot be empty' }, { status: 400 });
        }

        const dataSource = await getDataSource();
        const studentRepository = dataSource.getRepository(Student);

        const student = await studentRepository.findOne({
            where: { id: studentId }
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        Object.assign(student, body);
        const updatedStudent = await studentRepository.save(student);

        return NextResponse.json(updatedStudent);
    } catch (error) {
        console.error('Error updating student:', error);
        return NextResponse.json({
            error: 'Failed to update student',
            details: error.message
        }, { status: 500 });
    }
}

// DELETE student
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const studentId = parseInt(id);

        const dataSource = await getDataSource();
        const studentRepository = dataSource.getRepository(Student);

        const student = await studentRepository.findOne({
            where: { id: studentId }
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        await studentRepository.delete(studentId);
        return NextResponse.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
    }
}
