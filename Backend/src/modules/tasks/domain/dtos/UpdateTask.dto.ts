export class UpdateTaskDto{
     constructor(
          public title ?: string,
          public description ?: string,
          public isCompleted ?: boolean
     ){}
}