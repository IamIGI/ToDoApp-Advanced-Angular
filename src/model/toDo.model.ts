export interface ToDoObject {
  _id: string;
  userName: string;
  title: string;
  date?: string;
}

export interface ToDoCreateTaskResponse {
  message: string;
  toDoId: string;
}
