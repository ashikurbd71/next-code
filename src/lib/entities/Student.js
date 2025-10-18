import { EntitySchema } from 'typeorm';

export const Student = new EntitySchema({
    name: 'Student',
    tableName: 'students',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        },
        email: {
            type: 'varchar',
            unique: true
        },
        department: {
            type: 'varchar'
        },
        studentId: {
            type: 'varchar',
            unique: true,
            nullable: true
        },
        phone: {
            type: 'varchar',
            nullable: true
        },
        semester: {
            type: 'varchar',
            nullable: true
        },
        session: {
            type: 'varchar',
            nullable: true
        },
        gender: {
            type: 'varchar',
            nullable: true
        },
        rollNumber: {
            type: 'varchar',
            nullable: true
        },
        skills: {
            type: 'text',
            default: ''
        },
        instituteName: {
            type: 'varchar',
            nullable: true
        },
        approved: {
            type: 'boolean',
            default: false
        },
        profilePicture: {
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
