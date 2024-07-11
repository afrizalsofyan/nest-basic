import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  task_name: string;

  @IsOptional()
  @IsString()
  task_description: string;

  user_id: number;
}
