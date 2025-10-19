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
        const { name, email, department, phone, semester, session, gender, rollNumber, skills, profilePicture } = body;

        // Check if student with this email already exists
        const existingStudent = await studentRepository.findOne({
            where: { email }
        });

        if (existingStudent) {
            return NextResponse.json({
                error: 'Student with this email already exists',
                details: 'A student with this email address has already been registered',
                existingStudent: existingStudent
            }, { status: 409 });
        }

        // Generate unique student ID with retry logic
        let studentId;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            const existingStudents = await studentRepository.count();
            studentId = `nextcode-ov-${String(existingStudents + 1 + attempts).padStart(3, '0')}`;

            // Check if this studentId already exists
            const existingWithId = await studentRepository.findOne({
                where: { studentId }
            });

            if (!existingWithId) {
                break;
            }

            attempts++;
        } while (attempts < maxAttempts);

        if (attempts >= maxAttempts) {
            return NextResponse.json({
                error: 'Failed to generate unique student ID',
                details: 'Unable to generate a unique student ID after multiple attempts'
            }, { status: 500 });
        }

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
            profilePicture: profilePicture || null
        });

        const savedStudent = await studentRepository.save(student);
        return NextResponse.json(savedStudent, { status: 201 });
    } catch (error) {
        console.error('Error creating student:', error);

        // Handle specific database constraint errors
        if (error.code === '23505') { // PostgreSQL unique constraint violation
            if (error.constraint && error.constraint.includes('email')) {
                return NextResponse.json({
                    error: 'Email already exists',
                    details: 'A student with this email address is already registered'
                }, { status: 409 });
            } else if (error.constraint && error.constraint.includes('studentId')) {
                return NextResponse.json({
                    error: 'Student ID conflict',
                    details: 'Generated student ID already exists. Please try again.'
                }, { status: 409 });
            }
        }

        return NextResponse.json({
            error: 'Failed to create student',
            details: error.message
        }, { status: 500 });
    }
}
