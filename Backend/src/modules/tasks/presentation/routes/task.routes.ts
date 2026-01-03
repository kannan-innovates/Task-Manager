import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { CreateTaskUseCase } from '../../application/use-cases/CreateTask.usecase';
import { GetTaskByIdUseCase } from '../../application/use-cases/GetTaskById.usecase';
import { GetAllUserTasksUseCase } from '../../application/use-cases/GetAllUserTasks.usecase';
import { UpdateTaskUseCase } from '../../application/use-cases/UpdateTask.usecase';
import { DeleteTaskUseCase } from '../../application/use-cases/DeleteTask.usecase';
import { MongoTaskRepository } from '../../infrastructure/repositories/MongoTaskRepository';

const router = Router();

const taskRepository = new MongoTaskRepository();

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
const getAllUserTasksUseCase = new GetAllUserTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

const taskController = new TaskController(
  createTaskUseCase,
  getTaskByIdUseCase,
  getAllUserTasksUseCase,
  updateTaskUseCase,
  deleteTaskUseCase
);

router.post('/tasks', (req, res, next) => taskController.create(req, res, next));
router.get('/tasks', (req, res, next) => taskController.getAll(req, res, next));
router.get('/tasks/:id', (req, res, next) => taskController.getById(req, res, next));
router.put('/tasks/:id', (req, res, next) => taskController.update(req, res, next));
router.delete('/tasks/:id', (req, res, next) => taskController.delete(req, res, next));

export default router;