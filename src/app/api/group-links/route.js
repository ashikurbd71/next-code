import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { GroupLink } from '@/lib/entities/GroupLink';

// GET /api/group-links - Get all group links
export async function GET(request) {
    try {
        const dataSource = await getDataSource();
        const groupLinkRepository = dataSource.getRepository(GroupLink);

        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('eventId');

        let query = groupLinkRepository.createQueryBuilder('groupLink')
            .leftJoinAndSelect('groupLink.event', 'event');

        if (eventId) {
            query = query.where('groupLink.eventId = :eventId', { eventId });
        }

        const groupLinks = await query.getMany();

        return NextResponse.json(groupLinks);
    } catch (error) {
        console.error('Error fetching group links:', error);
        return NextResponse.json(
            { error: 'Failed to fetch group links' },
            { status: 500 }
        );
    }
}

// POST /api/group-links - Create a new group link
export async function POST(request) {
    try {
        const dataSource = await getDataSource();
        const groupLinkRepository = dataSource.getRepository(GroupLink);

        const body = await request.json();
        const { eventId, title, description, url, platform, joinCode, maxMembers } = body;

        // Validate required fields
        if (!eventId || !title || !url) {
            return NextResponse.json(
                { error: 'Event ID, title, and URL are required' },
                { status: 400 }
            );
        }

        const groupLink = groupLinkRepository.create({
            eventId,
            title,
            description,
            url,
            platform: platform || 'whatsapp',
            joinCode,
            maxMembers,
            isActive: true,
            currentMembers: 0
        });

        const savedGroupLink = await groupLinkRepository.save(groupLink);

        return NextResponse.json(savedGroupLink, { status: 201 });
    } catch (error) {
        console.error('Error creating group link:', error);
        return NextResponse.json(
            { error: 'Failed to create group link' },
            { status: 500 }
        );
    }
}
