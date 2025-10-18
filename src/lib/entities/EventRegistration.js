import { EntitySchema } from 'typeorm';

export const EventRegistration = new EntitySchema({
    name: 'EventRegistration',
    tableName: 'event_registrations',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        studentId: {
            type: 'int'
        },
        eventId: {
            type: 'int'
        },
        groupLinkId: {
            type: 'int',
            nullable: true
        },
        status: {
            type: 'varchar',
            default: 'pending'
        },
        notes: {
            type: 'text',
            nullable: true
        },
        instituteName: {
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
    },
    relations: {
        student: {
            target: 'Student',
            type: 'many-to-one',
            joinColumn: {
                name: 'studentId'
            }
        },
        event: {
            target: 'Event',
            type: 'many-to-one',
            joinColumn: {
                name: 'eventId'
            }
        },
        groupLink: {
            target: 'GroupLink',
            type: 'many-to-one',
            joinColumn: {
                name: 'groupLinkId'
            }
        }
    }
});
