import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilerDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
