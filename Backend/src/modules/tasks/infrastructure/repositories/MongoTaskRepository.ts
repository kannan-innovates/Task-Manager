import { Collection, ObjectId } from 'mongodb';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { Task } from '../../domain/entities/Task.entity';
import { CreateTaskDto } from '../../domain/dtos/CreateTask.dto';
import { UpdateTaskDto } from '../../domain/dtos/UpdateTask.dto';
import Database from '@shared/config/database.config';

interface TaskDocument {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MongoTaskRepository implements ITaskRepository {

  private get collection(): Collection<TaskDocument> {
    return Database.getInstance().getDb().collection<TaskDocument>('tasks');
  }


  async create(dto: CreateTaskDto, userId: string): Promise<Task> {
    const now = new Date();

    const taskDocument = {
      _id: this.generateId(),
      title: dto.title.trim(),
      description: dto.description?.trim() || '',
      isCompleted: false,
      createdBy: userId,
      createdAt: now,
      updatedAt: now
    };

    await this.collection.insertOne(taskDocument);

    return this.mapToEntity(taskDocument);
  }

  async findById(id: string): Promise<Task | null> {
    const taskDocument = await this.collection.findOne({ _id: id });

    if (!taskDocument) {
      return null;
    }

    return this.mapToEntity(taskDocument);
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    const taskDocuments = await this.collection
      .find({ createdBy: userId })
      .sort({ createdAt: -1 })  // Newest first
      .toArray();

    return taskDocuments.map(doc => this.mapToEntity(doc));
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const updateFields: any = {
      updatedAt: new Date()
    };

    if (dto.title !== undefined) {
      updateFields.title = dto.title.trim();
    }

    if (dto.description !== undefined) {
      updateFields.description = dto.description.trim();
    }

    if (dto.isCompleted !== undefined) {
      updateFields.isCompleted = dto.isCompleted;
    }

    await this.collection.updateOne(
      { _id: id },
      { $set: updateFields }
    );

    const updatedTask = await this.collection.findOne({ _id: id });

    if (!updatedTask) {
      throw new Error('Task not found after update');
    }

    return this.mapToEntity(updatedTask);
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: id });
  }

  // Helper method to convert MongoDB document to Entity
  private mapToEntity(doc: any): Task {
    return new Task(
      doc._id,
      doc.title,
      doc.description,
      doc.isCompleted,
      doc.createdBy,
      doc.createdAt,
      doc.updatedAt
    );
  }

  // Helper method to generate unique ID
  private generateId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}