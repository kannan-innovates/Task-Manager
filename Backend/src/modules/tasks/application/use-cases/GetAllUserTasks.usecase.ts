import { Task } from '../../domain/entities/Task.entity';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';

export class GetAllUserTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(userId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.findAllByUser(userId);

    return tasks;
  }
}