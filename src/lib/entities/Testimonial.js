import { EntitySchema } from 'typeorm';

export const Testimonial = new EntitySchema({
    name: 'Testimonial',
    tableName: 'testimonials',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        },
        role: {
            type: 'varchar'
        },
        department: {
            type: 'varchar'
        },
        photo: {
            type: 'varchar',
            nullable: true
        },
        content: {
            type: 'text'
        },
        isActive: {
            type: 'boolean',
            default: true
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP'
        },
        updatedAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});
