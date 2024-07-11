import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post('')
  async createTask(@Body() body: CreateTaskDTO) {
    const data = await this.taskService.createTask(body);
    return { success: true, data };
  }

  @UseGuards(AuthGuard)
  @Get('')
  async getAllTask() {
    return await this.taskService.getAllTask();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getTaskByID(@Param('id') id) {
    return await this.taskService.getTaskById(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateTask(@Param('id') id, @Body() body: UpdateTaskDTO) {
    return await this.taskService.updateTask(+id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteTask(@Param('id') id) {
    return this.taskService.deleteTask(+id);
  }
}
