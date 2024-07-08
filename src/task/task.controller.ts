import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('')
  async createTask(@Body() body: CreateTaskDTO) {
    const data = await this.taskService.createTask(body);
    return { success: true, data };
  }

  @Get('')
  async getAllTask() {
    return await this.taskService.getAllTask();
  }

  @Get('/:id')
  async getTaskByID(@Param('id') id) {
    return await this.taskService.getTaskById(+id);
  }

  @Patch('/:id')
  async updateTask(@Param('id') id, @Body() body: UpdateTaskDTO) {
    return await this.taskService.updateTask(+id, body);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id) {
    return this.taskService.deleteTask(+id);
  }
}
