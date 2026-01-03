import { Request, Response, NextFunction } from 'express';
import { CreateTaskUseCase } from '../../application/use-cases/CreateTask.usecase';
import { GetTaskByIdUseCase } from '../../application/use-cases/GetTaskById.usecase';
import { GetAllUserTasksUseCase } from '../../application/use-cases/GetAllUserTasks.usecase';
import { UpdateTaskUseCase } from '../../application/use-cases/UpdateTask.usecase';
import { DeleteTaskUseCase } from '../../application/use-cases/DeleteTask.usecase';
import { CreateTaskDto } from '../../domain/dtos/CreateTask.dto';
import { UpdateTaskDto } from '../../domain/dtos/UpdateTask.dto';
import { ApiResponse } from '@shared/utils/response.util';

export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private getTaskByIdUseCase: GetTaskByIdUseCase,
    private getAllUserTasksUseCase: GetAllUserTasksUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  /**
   * POST /tasks
   * Create a new task
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = new CreateTaskDto(
        req.body.title,
        req.body.description
      );

      const userId = req.user?.id;  

      if (!userId) {
        res.status(401).json(ApiResponse.error('Unauthorized', 401));
        return;
      }

      const task = await this.createTaskUseCase.execute(dto, userId);

      res.status(201).json(ApiResponse.success(task, 'Task created successfully'));
    } catch (error) {
      next(error);  
    }
  }

  /**
   * GET /tasks/:id
   * Get task by ID
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params.id;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json(ApiResponse.error('Unauthorized', 401));
        return;
      }

      const task = await this.getTaskByIdUseCase.execute(taskId, userId);

      res.status(200).json(ApiResponse.success(task));
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /tasks
   * Get all user's tasks
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json(ApiResponse.error('Unauthorized', 401));
        return;
      }

      const tasks = await this.getAllUserTasksUseCase.execute(userId);

      res.status(200).json(ApiResponse.success(tasks));
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /tasks/:id
   * Update task
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params.id;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json(ApiResponse.error('Unauthorized', 401));
        return;
      }

      const dto = new UpdateTaskDto(
        req.body.title,
        req.body.description,
        req.body.isCompleted
      );

      const task = await this.updateTaskUseCase.execute(taskId, dto, userId);

      res.status(200).json(ApiResponse.success(task, 'Task updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /tasks/:id
   * Delete task
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params.id;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json(ApiResponse.error('Unauthorized', 401));
        return;
      }

      await this.deleteTaskUseCase.execute(taskId, userId);

      res.status(200).json(ApiResponse.success(null, 'Task deleted successfully'));
    } catch (error) {
      next(error);
    }
  }
}