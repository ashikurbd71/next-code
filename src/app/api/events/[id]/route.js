import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Event } from '@/lib/entities/Event';

// GET single event
export async function GET(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const eventRepository = dataSource.getRepository(Event);

        const event = await eventRepository.findOne({
            where: { id: parseInt(params.id) }
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
}

// PUT update event
export async function PATCH(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const eventRepository = dataSource.getRepository(Event);

        const body = await request.json();
        const event = await eventRepository.findOne({
            where: { id: parseInt(params.id) }
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        Object.assign(event, body);
        if (body.date) {
            event.date = new Date(body.date);
        }

        const updatedEvent = await eventRepository.save(event);
        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}

// DELETE event
export async function DELETE(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const eventRepository = dataSource.getRepository(Event);

        const result = await eventRepository.delete(parseInt(params.id));

        if (result.affected === 0) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}
