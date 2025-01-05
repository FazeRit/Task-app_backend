import { Controller, Get, Param, Post, Query, Body, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto';
import { UseGuards } from '../auth/guard'

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
    getAllTasks(@Query('role') role?: 'ADMIN' | 'USER'){
        return this.tasksService.getAllTasks();
    }

    @Get('find/:id')
    findTask(@Param('id') id: string){
        return this.tasksService.findTask(Number(id));
    }

    @Post('add')
    addTask(@Body('task') task: TaskDto){
        return this.tasksService.addTask(task);
    }   

    @Delete('/delete/:id')
    deleteTask(@Param('id') id: string){
        return this.tasksService.deleteTask(Number(id));
    }

    @Patch('/edit/:id')
    updateTask(@Param('id') id: string, @Body('data') data: any){
        this.tasksService.updateTask(Number(id), data);
    }
}