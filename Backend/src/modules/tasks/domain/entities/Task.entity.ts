export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public isCompleted: boolean,
    public readonly createdBy: string,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}