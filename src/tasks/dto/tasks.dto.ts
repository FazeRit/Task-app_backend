import { IsEnum, IsString, IsDateString } from 'class-validator';

enum TaskStatus {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    IN_PROGRESS = 'IN_PROGRESS',
}
  
enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL',
}

export class TaskDto {
    @IsEnum(TaskStatus)
    status: TaskStatus = TaskStatus.NOT_STARTED;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(Priority)
    priority: Priority = Priority.MEDIUM;

    @IsDateString()
    dueDate: string;
}