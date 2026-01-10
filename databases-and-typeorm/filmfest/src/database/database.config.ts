import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Defines and exports the database configuration using registerAs
// registerAs = allows grouping related configuration settings
export default registerAs(
  'database', // name of the configuration group
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    // Specifies the path to the entity files, enabling auto-loading of entities
    // this is useful for TypeORM to recognize and manage the entities (tables of the database)
    entities: ['dist/**/*.entity.js'],
    autoLoadEntities: true, // Automatically loads entities registered through TypeORM modules
    // Enables automatic synchronization of the database schema with the entities
    // Only enabled in development environment to prevent data loss in production
    synchronize: 'development' === process.env.NODE_ENV,
  }),
);
