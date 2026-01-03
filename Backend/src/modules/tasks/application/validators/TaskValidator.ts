import { CreateTaskDto } from '../../domain/dtos/CreateTask.dto';
import { UpdateTaskDto } from '../../domain/dtos/UpdateTask.dto';

export class TaskValidator {
 
  static validateCreateTask(dto: CreateTaskDto): void {
    const errors: string[] = [];

    if (!dto.title) {
      errors.push('Title is required');
    } else {
      const trimmedTitle = dto.title.trim();
      
      if (trimmedTitle.length === 0) {
        errors.push('Title cannot be empty');
      }
      
      if (trimmedTitle.length < 3) {
        errors.push('Title must be at least 3 characters long');
      }
      
      if (trimmedTitle.length > 100) {
        errors.push('Title cannot exceed 100 characters');
      }
    }

    if (dto.description) {
      if (dto.description.length > 500) {
        errors.push('Description cannot exceed 500 characters');
      }
    }
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  static validateUpdateTask(dto: UpdateTaskDto): void {
    const errors: string[] = [];

    if (dto.title !== undefined) {
      if (dto.title.trim().length === 0) {
        errors.push('Title cannot be empty');
      }
      
      if (dto.title.trim().length < 3) {
        errors.push('Title must be at least 3 characters long');
      }
      
      if (dto.title.trim().length > 100) {
        errors.push('Title cannot exceed 100 characters');
      }
    }

    if (dto.description !== undefined && dto.description.length > 500) {
      errors.push('Description cannot exceed 500 characters');
    }

    if (dto.isCompleted !== undefined && typeof dto.isCompleted !== 'boolean') {
      errors.push('isCompleted must be a boolean');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }

  
  static validateId(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new Error('ID is required');
    }

    const idPattern = /^task-\d+-[a-z0-9]+$/;
    
    if (!idPattern.test(id)) {
      throw new Error('Invalid task ID format');
    }
  }
}