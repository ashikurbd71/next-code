import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Committee } from '@/lib/entities/Committee';

// GET all committee members
export async function GET() {
    try {
        const dataSource = await getDataSource();
        const committeeRepository = dataSource.getRepository(Committee);

        const members = await committeeRepository.find({
            order: { createdAt: 'ASC' }
        });

        return NextResponse.json(members);
    } catch (error) {
        console.error('Error fetching committee members:', error);
        return NextResponse.json({ error: 'Failed to fetch committee members' }, { status: 500 });
    }
}

// POST new committee member
export async function POST(request) {
    try {
        const dataSource = await getDataSource();
        const committeeRepository = dataSource.getRepository(Committee);

        const body = await request.json();
        const { name, designation, photo, bio, email, linkedin } = body;

        const member = committeeRepository.create({
            name,
            designation,
            photo,
            bio,
            email,
            linkedin
        });

        const savedMember = await committeeRepository.save(member);
        return NextResponse.json(savedMember, { status: 201 });
    } catch (error) {
        console.error('Error creating committee member:', error);
        return NextResponse.json({ error: 'Failed to create committee member' }, { status: 500 });
    }
}
