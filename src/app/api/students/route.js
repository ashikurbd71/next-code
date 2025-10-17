import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Student } from '@/lib/entities/Student';

// GET all students
export async function GET(request) {
    try {
        const dataSource = await getDataSource();
        const studentRepository = dataSource.getRepository(Student);

        const { searchParams } = new URL(request.url);
        const approved = searchParams.get('approved');
        const email = searchParams.get('email');

        let whereClause = {};
        if (approved !== null) {
            whereClause.approved = approved === 'true';
        }
        if (email) {
            whereClause.email = email;
        }

        const students = await studentRepository.find({
            where: whereClause,
            order: { createdAt: 'DESC' }
        });

        return NextResponse.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json({
            error: 'Failed to fetch students',
            details: error.message
        }, { status: 500 });
    }
}

// POST new student
export async function POST(request) {
    try {
        const dataSource = await getDataSource();
        const studentRepository = dataSource.getRepository(Student);

        const body = await request.json();
        const { name, email, department, phone, semester, session, gender, rollNumber, skills } = body;

        // Check if student with this email already exists
        const existingStudent = await studentRepository.findOne({
            where: { email }
        });

        if (existingStudent) {
            return NextResponse.json(existingStudent, { status: 200 });
        }

        // Generate unique student ID
        const existingStudents = await studentRepository.count();
        const studentId = `nextcode-ov-${String(existingStudents + 1).padStart(2, '0')}`;

        const student = studentRepository.create({
            name,
            email,
            department,
            studentId,
            phone,
            semester,
            session,
            gender,
            rollNumber,
            skills: Array.isArray(skills) ? skills.join(',') : (skills || ''),
            approved: false,
            profilePicture: null
        });

        const savedStudent = await studentRepository.save(student);
        return NextResponse.json(savedStudent, { status: 201 });
    } catch (error) {
        console.error('Error creating student:', error);
        return NextResponse.json({
            error: 'Failed to create student',
            details: error.message
        }, { status: 500 });
    }
}
