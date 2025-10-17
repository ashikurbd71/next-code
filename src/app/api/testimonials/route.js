import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Testimonial } from '@/lib/entities/Testimonial';

// GET all testimonials
export async function GET(request) {
    try {
        const dataSource = await getDataSource();
        const testimonialRepository = dataSource.getRepository(Testimonial);

        const { searchParams } = new URL(request.url);
        const active = searchParams.get('active');

        let testimonials;
        if (active !== null) {
            testimonials = await testimonialRepository.find({
                where: { isActive: active === 'true' },
                order: { createdAt: 'DESC' }
            });
        } else {
            testimonials = await testimonialRepository.find({
                order: { createdAt: 'DESC' }
            });
        }

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }
}

// POST new testimonial
export async function POST(request) {
    try {
        const dataSource = await getDataSource();
        const testimonialRepository = dataSource.getRepository(Testimonial);

        const body = await request.json();
        const { name, role, department, photo, content, isActive } = body;

        const testimonial = testimonialRepository.create({
            name,
            role,
            department,
            photo,
            content,
            isActive: isActive !== undefined ? isActive : true
        });

        const savedTestimonial = await testimonialRepository.save(testimonial);
        return NextResponse.json(savedTestimonial, { status: 201 });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
}
