import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITask } from './types/task.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(data: CreateTaskDTO) {
    const task = await this.prisma.tasks.create({ data });
    return task;
  }
  async getAllTask(): Promise<ITask[]> {
    const task = await this.prisma.tasks.findMany();
    return task;
  }
  async getTaskById(id: number) {
    return await this.prisma.tasks.findFirst({
      where: {
        id,
      },
    });
  }
  async updateTask(id: number, data: ITask) {
    return await this.prisma.tasks.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteTask(id: number) {
    return await this.prisma.tasks.delete({
      where: {
        id,
      },
    });
  }
}
