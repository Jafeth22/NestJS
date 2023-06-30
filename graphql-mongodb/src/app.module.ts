import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true, // It is own of mongodb
      entities: [Lesson],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // This line saves the schema in memory, so, it'll regenerate every time we started the next app
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonModule,
  ],
})
export class AppModule {}
