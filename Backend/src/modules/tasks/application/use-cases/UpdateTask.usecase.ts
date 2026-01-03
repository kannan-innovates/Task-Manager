import { Task } from '../../domain/entities/Task.entity';
import { UpdateTaskDto } from '../../domain/dtos/UpdateTask.dto';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { TaskValidator } from '../validators/TaskValidator';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string, dto: UpdateTaskDto, userId: string): Promise<Task> {

    TaskValidator.validateId(taskId);

    TaskValidator.validateUpdateTask(dto);

    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error('Task not found');
    }

    if (existingTask.createdBy !== userId) {
      throw new Error('Unauthorized: You cannot update this task');
    }

    return await this.taskRepository.update(taskId, dto);
  }
}