import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { EventRegistration } from '@/lib/entities/EventRegistration';

// GET single event registration
export async function GET(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const registrationRepository = dataSource.getRepository(EventRegistration);

        const registration = await registrationRepository.findOne({
            where: { id: parseInt(params.id) },
            relations: ['student', 'event']
        });

        if (!registration) {
            return NextResponse.json({ error: 'Event registration not found' }, { status: 404 });
        }

        return NextResponse.json(registration);
    } catch (error) {
        console.error('Error fetching event registration:', error);
        return NextResponse.json({ error: 'Failed to fetch event registration' }, { status: 500 });
    }
}

// PUT update event registration
export async function PUT(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const registrationRepository = dataSource.getRepository(EventRegistration);

        const body = await request.json();
        const registration = await registrationRepository.findOne({
            where: { id: parseInt(params.id) }
        });

        if (!registration) {
            return NextResponse.json({ error: 'Event registration not found' }, { status: 404 });
        }

        Object.assign(registration, body);
        const updatedRegistration = await registrationRepository.save(registration);

        // Fetch the complete registration with relations
        const completeRegistration = await registrationRepository.findOne({
            where: { id: updatedRegistration.id },
            relations: ['student', 'event']
        });

        return NextResponse.json(completeRegistration);
    } catch (error) {
        console.error('Error updating event registration:', error);
        return NextResponse.json({ error: 'Failed to update event registration' }, { status: 500 });
    }
}

// DELETE event registration
export async function DELETE(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const registrationRepository = dataSource.getRepository(EventRegistration);

        const result = await registrationRepository.delete(parseInt(params.id));

        if (result.affected === 0) {
            return NextResponse.json({ error: 'Event registration not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Event registration deleted successfully' });
    } catch (error) {
        console.error('Error deleting event registration:', error);
        return NextResponse.json({ error: 'Failed to delete event registration' }, { status: 500 });
    }
}
