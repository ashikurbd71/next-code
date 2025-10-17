import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Event } from '@/lib/entities/Event';

// GET all events
export async function GET(request) {
    try {
        const dataSource = await getDataSource();
        const eventRepository = dataSource.getRepository(Event);

        const { searchParams } = new URL(request.url);
        const upcoming = searchParams.get('upcoming');

        let events;
        if (upcoming !== null) {
            events = await eventRepository.find({
                where: { isUpcoming: upcoming === 'true' },
                order: { date: 'ASC' }
            });
        } else {
            events = await eventRepository.find({
                order: { date: 'DESC' }
            });
        }

        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

// POST new event
export async function POST(request) {
    try {
        const dataSource = await getDataSource();
        const eventRepository = dataSource.getRepository(Event);

        const body = await request.json();
        const { title, description, image, date, isUpcoming, registrationLink } = body;

        const event = eventRepository.create({
            title,
            description,
            image,
            date: new Date(date),
            isUpcoming: isUpcoming || false,
            registrationLink
        });

        const savedEvent = await eventRepository.save(event);
        return NextResponse.json(savedEvent, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
