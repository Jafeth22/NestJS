import { TaskStatus } from '../tasks.model';

export class GetTaskFilerDto {
  status?: TaskStatus;
  search?: string;
}
