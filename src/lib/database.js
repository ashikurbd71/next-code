import { DataSource } from 'typeorm';
import { Student } from './entities/Student';
import { Event } from './entities/Event';
import { EventRegistration } from './entities/EventRegistration';
import { Committee } from './entities/Committee';
import { Testimonial } from './entities/Testimonial';
import { GroupLink } from './entities/GroupLink';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'ep-round-boat-adlak5uq-pooler.c-2.us-east-1.aws.neon.tech',
    port: 5432,
    username: 'neondb_owner',
    password: 'npg_Nis2FgfC4jWP',
    database: 'neondb',
    entities: [Student, Event, EventRegistration, Committee, Testimonial, GroupLink],
    synchronize: true, // Only for development
    logging: true, // Enable logging to see what's happening
    ssl: {
        rejectUnauthorized: false
    }
});

let dataSource = null;

export const getDataSource = async () => {
    if (!dataSource) {
        if (!AppDataSource.isInitialized) {
            try {
                console.log('Initializing database connection...');
                dataSource = await AppDataSource.initialize();
                console.log('Database connection established successfully');
            } catch (error) {
                console.error('Error initializing database:', error);
                console.error('Database error details:', {
                    message: error.message,
                    code: error.code,
                    stack: error.stack
                });
                throw error;
            }
        } else {
            dataSource = AppDataSource;
        }
    }
    return dataSource;
};

export default AppDataSource;
