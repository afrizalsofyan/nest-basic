import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ITask } from './types/task.types';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private req: any,
  ) {}
  async createTask(data: CreateTaskDTO) {
    const task = await this.prisma.tasks.create({
      data: {
        ...data,
        users_id: this.req.user.id,
      },
    });
    return task;
  }
  async getAllTask(): Promise<ITask[]> {
    const task = await this.prisma.tasks.findMany({
      where: {
        users_id: this.req.user.id,
      },
      include: {
        users: {
          select: {
            id: true,
            avatar: true,
            email: true,
            name: true,
          },
        },
      },
    });
    if (!task.length) {
      throw new HttpException('Task empty', HttpStatus.OK, {
        cause: new Error('Task with user id not found'),
      });
    }
    return task;
  }
  async getTaskById(id: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id,
        users_id: this.req.user.id,
      },
      select: {
        id: true,
        created_at: true,
        task_description: true,
        task_name: true,
        users: {
          select: {
            id: true,
            avatar: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!task) {
      throw new HttpException('Data empty', HttpStatus.OK);
    }
    return task;
  }
  async updateTask(id: number, data: ITask) {
    return await this.prisma.tasks.update({
      where: {
        id,
        users_id: this.req.user.id,
      },
      data,
    });
  }
  async deleteTask(id: number) {
    return await this.prisma.tasks.delete({
      where: {
        id,
        users_id: this.req.user.id,
      },
    });
  }
}
