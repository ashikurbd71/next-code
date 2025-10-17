import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Committee } from '@/lib/entities/Committee';

export async function GET(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const committeeRepository = dataSource.getRepository(Committee);

        const { id } = await params;
        const member = await committeeRepository.findOne({
            where: { id: parseInt(id) }
        });

        if (!member) {
            return NextResponse.json({ error: 'Committee member not found' }, { status: 404 });
        }

        return NextResponse.json(member);
    } catch (error) {
        console.error('Error fetching committee member:', error);
        return NextResponse.json({ error: 'Failed to fetch committee member' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const committeeRepository = dataSource.getRepository(Committee);

        const { id } = await params;
        const body = await request.json();
        const member = await committeeRepository.findOne({
            where: { id: parseInt(id) }
        });

        if (!member) {
            return NextResponse.json({ error: 'Committee member not found' }, { status: 404 });
        }

        Object.assign(member, body);
        const updatedMember = await committeeRepository.save(member);

        return NextResponse.json(updatedMember);
    } catch (error) {
        console.error('Error updating committee member:', error);
        return NextResponse.json({ error: 'Failed to update committee member' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const committeeRepository = dataSource.getRepository(Committee);

        const { id } = await params;
        const result = await committeeRepository.delete(parseInt(id));

        if (result.affected === 0) {
            return NextResponse.json({ error: 'Committee member not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Committee member deleted successfully' });
    } catch (error) {
        console.error('Error deleting committee member:', error);
        return NextResponse.json({ error: 'Failed to delete committee member' }, { status: 500 });
    }
}