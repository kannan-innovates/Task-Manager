import { Task } from '../../domain/entities/Task.entity';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { TaskValidator } from '../validators/TaskValidator';

export class GetTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string, userId: string): Promise<Task> {
    TaskValidator.validateId(taskId);

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    if (task.createdBy !== userId) {
      throw new Error('Unauthorized: You do not have access to this task');
    }

    return task;
  }
}