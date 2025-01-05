import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async getAllTasks(userId: number) {
        try {
            const tasks = await this.prisma.task.findMany({
                where: { userId },
            });

            if (!tasks || tasks.length === 0) {
                throw new NotFoundException('No tasks found for this user');
            }

            return tasks;
        } catch (error) { 
            throw new BadRequestException('Error fetching tasks: ' + error.message);
        }
    }

    async findTask(userId: number, taskId: number) {
        try {
            const task = await this.prisma.task.findUnique({
                where: {
                    id: taskId,
                    userId,
                },
            });

            if (!task) {
                throw new NotFoundException('Task not found');
            }

            return task;
        } catch (error) {
            throw new BadRequestException('Error finding task: ' + error.message);
        }
    }

    async addTask(task: TaskDto, userId: number) {
        try {
            const newTask = await this.prisma.task.create({
                data: {
                    userId,
                    ...task,
                },
            });
            
            return newTask;
        } catch (error) {
            throw new BadRequestException('Error creating task: ' + error.message);
        }
    }

    async deleteTask(userId: number, taskId: number) {
        try {
            const task = await this.prisma.task.findUnique({
                where: {
                    id: taskId,
                    userId,
                },
            });

            if (!task) {
                throw new NotFoundException('Task not found for deletion');
            }

            await this.prisma.task.delete({
                where: {
                    id: taskId,
                    userId,
                },
            });
        } catch (error) {
            throw new BadRequestException('Error deleting task: ' + error.message);
        }
    }

    async updateTask(userId: number, taskId: number, field: string, value: string) {
        try {
            const task = await this.prisma.task.findUnique({
                where: {
                        id: taskId,
                        userId,
                    },
            })

            if (!task) {
                throw new NotFoundException('Task not found for update');
            }

            const updatedTask = await this.prisma.task.update({
                where: {
                    id: taskId,
                    userId,
                },
                data: {
                    [field]: value,
                }
            });
            
            return updatedTask;
        } catch (error) {
            throw new BadRequestException('Error updating task: ' + error.message);
        }
    }
}
