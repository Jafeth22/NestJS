import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID()
  @Field((type) => ID)
  lessonId: string;

  // Here we are using v4
  // Validate each of the array item
  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  studentIds: string[];
}
