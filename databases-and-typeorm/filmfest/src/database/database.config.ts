import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Defines and exports the database configuration using registerAs
// registerAs = allows grouping related configuration settings
export default registerAs(
  'database', // name of the configuration group
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    entities: ['dist/**/*.entity.js'],
    autoLoadEntities: true,
    synchronize: 'development' === process.env.NODE_ENV,
  }),
);
