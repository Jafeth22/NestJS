import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Here we are initializing  the ConfigModule
    ConfigModule.forRoot({
      // Here we are using envFiles per environment, the order will import
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    // It uses Async because the values are not immediately when app starts, so,
    // we need to wait for the config module to initialize
    TypeOrmModule.forRootAsync({
      // What modules do I depend?
      imports: [ConfigModule],
      // What I need to inject from those modules?
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // it is call for nestJs when we want to initialize this module async
        // This arrow func will return the config data
        return {
          type: 'postgres',
          // Nestjs will define entities, so it will translate tables and schemas
          autoLoadEntities: true,
          // It always keep the db schema sync with the help of TypeORM
          synchronize: true,
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
