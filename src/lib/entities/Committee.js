import { EntitySchema } from 'typeorm';

export const Committee = new EntitySchema({
    name: 'Committee',
    tableName: 'committee',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        },
        designation: {
            type: 'varchar'
        },
        photo: {
            type: 'varchar',
            nullable: true
        },
        bio: {
            type: 'text',
            nullable: true
        },
        email: {
            type: 'varchar',
            nullable: true
        },
        linkedin: {
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
