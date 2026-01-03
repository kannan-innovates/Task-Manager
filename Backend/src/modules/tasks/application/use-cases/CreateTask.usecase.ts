import { Task } from '../../domain/entities/Task.entity';
import { CreateTaskDto } from '../../domain/dtos/CreateTask.dto';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { TaskValidator } from '../validators/TaskValidator'; 

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(dto: CreateTaskDto, userId: string): Promise<Task> {
    
    TaskValidator.validateCreateTask(dto);

    const task = new Task(
      this.generateId(),
      dto.title.trim(),
      dto.description?.trim() || '',
      false,
      userId,
      new Date(),
      new Date()
    );

    return await this.taskRepository.create(task, userId);
  }

  private generateId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}