import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  task_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  task_description: string;
}
