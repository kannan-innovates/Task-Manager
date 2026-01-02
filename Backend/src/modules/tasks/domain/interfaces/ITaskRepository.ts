import { Task } from '../entities/Task.entity';
import { CreateTaskDto } from '../dtos/CreateTask.dto';
import { UpdateTaskDto } from '../dtos/UpdateTask.dto';

export interface ITaskRepository {
  create(dto: CreateTaskDto, userId: string): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAllByUser(userId: string): Promise<Task[]>;
  update(id: string, dto: UpdateTaskDto): Promise<Task>;
  delete(id: string): Promise<void>;
}