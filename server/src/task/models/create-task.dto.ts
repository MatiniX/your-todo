export class CreateTaskDto {
  title: string;
  fromUserId: number;
  toUserId: number;
  description?: string;
}
