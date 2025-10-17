import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { GroupLink } from '@/lib/entities/GroupLink';

// GET /api/group-links/[id] - Get a specific group link
export async function GET(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const groupLinkRepository = dataSource.getRepository(GroupLink);

        const groupLink = await groupLinkRepository.findOne({
            where: { id: params.id },
            relations: ['event']
        });

        if (!groupLink) {
            return NextResponse.json(
                { error: 'Group link not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(groupLink);
    } catch (error) {
        console.error('Error fetching group link:', error);
        return NextResponse.json(
            { error: 'Failed to fetch group link' },
            { status: 500 }
        );
    }
}

// PUT /api/group-links/[id] - Update a group link
export async function PUT(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const groupLinkRepository = dataSource.getRepository(GroupLink);

        const body = await request.json();
        const { title, description, url, platform, joinCode, maxMembers, isActive, currentMembers } = body;

        const groupLink = await groupLinkRepository.findOne({
            where: { id: params.id }
        });

        if (!groupLink) {
            return NextResponse.json(
                { error: 'Group link not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (title !== undefined) groupLink.title = title;
        if (description !== undefined) groupLink.description = description;
        if (url !== undefined) groupLink.url = url;
        if (platform !== undefined) groupLink.platform = platform;
        if (joinCode !== undefined) groupLink.joinCode = joinCode;
        if (maxMembers !== undefined) groupLink.maxMembers = maxMembers;
        if (isActive !== undefined) groupLink.isActive = isActive;
        if (currentMembers !== undefined) groupLink.currentMembers = currentMembers;

        const updatedGroupLink = await groupLinkRepository.save(groupLink);

        return NextResponse.json(updatedGroupLink);
    } catch (error) {
        console.error('Error updating group link:', error);
        return NextResponse.json(
            { error: 'Failed to update group link' },
            { status: 500 }
        );
    }
}

// DELETE /api/group-links/[id] - Delete a group link
export async function DELETE(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const groupLinkRepository = dataSource.getRepository(GroupLink);

        const groupLink = await groupLinkRepository.findOne({
            where: { id: params.id }
        });

        if (!groupLink) {
            return NextResponse.json(
                { error: 'Group link not found' },
                { status: 404 }
            );
        }

        await groupLinkRepository.remove(groupLink);

        return NextResponse.json({ message: 'Group link deleted successfully' });
    } catch (error) {
        console.error('Error deleting group link:', error);
        return NextResponse.json(
            { error: 'Failed to delete group link' },
            { status: 500 }
        );
    }
}
