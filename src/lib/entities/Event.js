import { EntitySchema } from 'typeorm';

export const Event = new EntitySchema({
    name: 'Event',
    tableName: 'events',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        title: {
            type: 'varchar'
        },
        description: {
            type: 'text'
        },
        image: {
            type: 'varchar',
            nullable: true
        },
        date: {
            type: 'timestamp'
        },
        isUpcoming: {
            type: 'boolean',
            default: false
        },
        registrationLink: {
            type: 'varchar',
            nullable: true
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
