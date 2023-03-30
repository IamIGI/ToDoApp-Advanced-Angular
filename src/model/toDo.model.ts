export interface ToDoObject {
  _id: string;
  userName: string;
  title: string;
  isDone: boolean;
  date?: string;
}

export interface ToDoCreateTaskResponse {
  message: string;
  toDoId: string;
}
