import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}

    async getAllTasks(){
        return await this.prisma.task.findMany({})
    } 

    async findTask(id: number){
        const task = await this.prisma.task.findMany({
            where: {
                id
            }
        })
        return task;
    }

    async addTask(task: TaskDto){
        const newTask = await this.prisma.task.create({
            data: {
                ...task
            }
        })
        return newTask;
    }

    async deleteTask(id: number){
        await this.prisma.task.delete({
            where: {
                id
            }
        })
    }

    async updateTask(id: number, data: any){
        const task = this.prisma.task.update({
            where: {
                id
            },
            data: {
                ...data
            }
        })
    }
}