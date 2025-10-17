import { EntitySchema } from 'typeorm';

export const GroupLink = new EntitySchema({
    name: 'GroupLink',
    tableName: 'group_links',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        eventId: {
            type: 'int'
        },
        title: {
            type: 'varchar'
        },
        description: {
            type: 'text'
        },
        url: {
            type: 'varchar'
        },
        isActive: {
            type: 'boolean',
            default: true
        },
        platform: {
            type: 'varchar',
            default: 'whatsapp'
        },
        joinCode: {
            type: 'varchar',
            nullable: true
        },
        maxMembers: {
            type: 'int',
            nullable: true
        },
        currentMembers: {
            type: 'int',
            default: 0
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
        event: {
            target: 'Event',
            type: 'many-to-one',
            joinColumn: {
                name: 'eventId'
            }
        }
    }
});
