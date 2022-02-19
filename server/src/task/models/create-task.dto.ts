import { TaskDifficulty } from 'src/entities/Task.entity';

export class CreateTaskDto {
  title: string;
  fromUserId: number;
  toUserId: number;
  difficulty: TaskDifficulty;
  description?: string;
}
