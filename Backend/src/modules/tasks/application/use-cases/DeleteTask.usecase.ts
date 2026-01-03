import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { TaskValidator } from '../validators/TaskValidator';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string, userId: string): Promise<void> {

    TaskValidator.validateId(taskId);

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    if (task.createdBy !== userId) {
      throw new Error('Unauthorized: You cannot delete this task');
    }
    await this.taskRepository.delete(taskId);
  }
}