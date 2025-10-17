import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { EventRegistration } from '@/lib/entities/EventRegistration';

// GET all event registrations
export async function GET(request) {
    try {
        const dataSource = await getDataSource();
        const registrationRepository = dataSource.getRepository(EventRegistration);

        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('eventId');
        const studentId = searchParams.get('studentId');
        const status = searchParams.get('status');

        let whereClause = {};
        if (eventId) whereClause.eventId = parseInt(eventId);
        if (studentId) whereClause.studentId = parseInt(studentId);
        if (status) whereClause.status = status;

        const registrations = await registrationRepository.find({
            where: whereClause,
            relations: ['student', 'event'],
            order: { createdAt: 'DESC' }
        });

        return NextResponse.json(registrations);
    } catch (error) {
        console.error('Error fetching event registrations:', error);
        return NextResponse.json({ error: 'Failed to fetch event registrations' }, { status: 500 });
    }
}

// POST new event registration
export async function POST(request) {
    try {
        const dataSource = await getDataSource();
        const registrationRepository = dataSource.getRepository(EventRegistration);

        const body = await request.json();
        console.log('Event registration request body:', body);

        const { studentId, eventId, notes, groupLinkId } = body;

        // Validate required fields
        if (!studentId || !eventId) {
            return NextResponse.json({
                error: 'Missing required fields: studentId and eventId are required'
            }, { status: 400 });
        }

        // Check if student exists
        const studentRepository = dataSource.getRepository('Student');
        const student = await studentRepository.findOne({
            where: { id: parseInt(studentId) }
        });

        if (!student) {
            return NextResponse.json({
                error: 'Student not found'
            }, { status: 404 });
        }

        // Check if event exists
        const eventRepository = dataSource.getRepository('Event');
        const event = await eventRepository.findOne({
            where: { id: parseInt(eventId) }
        });

        if (!event) {
            return NextResponse.json({
                error: 'Event not found'
            }, { status: 404 });
        }

        // Check if registration already exists
        const existingRegistration = await registrationRepository.findOne({
            where: { studentId: parseInt(studentId), eventId: parseInt(eventId) }
        });

        if (existingRegistration) {
            return NextResponse.json({ error: 'Already registered for this event' }, { status: 400 });
        }

        const registration = registrationRepository.create({
            studentId: parseInt(studentId),
            eventId: parseInt(eventId),
            notes,
            groupLinkId: groupLinkId ? parseInt(groupLinkId) : null,
            status: 'pending'
        });

        const savedRegistration = await registrationRepository.save(registration);
        console.log('Saved registration:', savedRegistration);

        // Fetch the complete registration with relations
        const completeRegistration = await registrationRepository.findOne({
            where: { id: savedRegistration.id },
            relations: ['student', 'event', 'groupLink']
        });

        return NextResponse.json(completeRegistration, { status: 201 });
    } catch (error) {
        console.error('Error creating event registration:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        return NextResponse.json({
            error: 'Failed to create event registration',
            details: error.message
        }, { status: 500 });
    }
}
