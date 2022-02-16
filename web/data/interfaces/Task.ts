export interface Task {
  id: number;
  title: string;
  description: string | null;
  taskState: "fulfilled" | "unfulfilled" | "awaiting";
  taskDifficulty: "easy" | "medium" | "hard";
  createdAt: string;
  updatedAt: string;
  toUser?: {
    id: number;
    username: string;
  };
  fromUser?: {
    id: number;
    username: string;
  };
}
