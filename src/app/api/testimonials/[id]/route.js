import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Testimonial } from '@/lib/entities/Testimonial';

// GET single testimonial
export async function GET(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const testimonialRepository = dataSource.getRepository(Testimonial);

        const testimonial = await testimonialRepository.findOne({
            where: { id: parseInt(params.id) }
        });

        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
    }
}

// PUT update testimonial (full update)
export async function PUT(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const testimonialRepository = dataSource.getRepository(Testimonial);

        const body = await request.json();
        const testimonial = await testimonialRepository.findOne({
            where: { id: parseInt(params.id) }
        });

        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        Object.assign(testimonial, body);
        const updatedTestimonial = await testimonialRepository.save(testimonial);

        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

// PATCH update testimonial (partial update)
export async function PATCH(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const testimonialRepository = dataSource.getRepository(Testimonial);

        const body = await request.json();
        const testimonial = await testimonialRepository.findOne({
            where: { id: parseInt(params.id) }
        });

        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        // Only update the fields that are provided in the request body
        Object.assign(testimonial, body);
        const updatedTestimonial = await testimonialRepository.save(testimonial);

        return NextResponse.json(updatedTestimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}

// DELETE testimonial
export async function DELETE(request, { params }) {
    try {
        const dataSource = await getDataSource();
        const testimonialRepository = dataSource.getRepository(Testimonial);

        const result = await testimonialRepository.delete(parseInt(params.id));

        if (result.affected === 0) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
