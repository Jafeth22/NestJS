import { Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

/**
 * Here we define queries or mutations
 * queries = retrieves data
 * mutations = create new data or change existing
 */
@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'idValue1',
      name: 'Test Name',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
