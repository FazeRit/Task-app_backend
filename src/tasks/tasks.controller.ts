import { Controller, Get, Param, Post, Body, Delete, Patch, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto';
import { JwtGuard } from '../auth/guard/index';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    /**
      GET /tasks/read
      GET /tasks/read/:id
      POST /tasks/add
      DELETE /tasks/delete/:id
      PATCH /tasks/:id
     */

    @UseGuards(JwtGuard)
    @Get('read')
    getAllTasks(@GetUser() user: User) {
        return this.tasksService.getAllTasks(user.id);
    }

    @UseGuards(JwtGuard)
    @Get('find/:id')
    findTask(@GetUser() user: User, @Param('id') id: string){
        return this.tasksService.findTask(user.id, Number(id));
    }

    @UseGuards(JwtGuard)
    @Post('add')
    addTask(@GetUser() user: User, @Body('task') task: TaskDto) {
        return this.tasksService.addTask(task, user.id);
    }

    @UseGuards(JwtGuard)
    @Delete('/delete/:id')
    deleteTask(@GetUser() user: User, @Param('id') id: string){
        return this.tasksService.deleteTask(user.id, Number(id));
    }
    
    @UseGuards(JwtGuard)
    @Patch('/edit/:id')
    updateTask(@GetUser() user: User, @Param('id') id: string, @Body('field') field: string, @Body('data') value: string){
        this.tasksService.updateTask(user.id, Number(id), field, value);
    }
}