import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ToDoCreateTaskResponse, ToDoObject } from 'src/model/toDo.model';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  URL = 'http://localhost:5000/todolist';
  toDoListChange = new Subject<ToDoObject[]>();
  private toDo: ToDoObject[] = [];

  constructor(private http: HttpClient) {}

  fetchToDo() {
    return this.http.get<ToDoObject[]>(this.URL + '/all').pipe(
      tap((data) => {
        this.toDo = data;
      })
    );
  }

  createToDo(newToDo: { userName: string; title: string }) {
    return this.http.post<ToDoCreateTaskResponse>(this.URL + '/add', newToDo);
  }

  deleteToDo(_id: string) {
    return this.http.delete(this.URL + '/delete/' + _id).subscribe({
      next: () => {
        this.refreshToDoList();
      },
    });
  }

  getToDos() {
    return this.toDo.slice();
  }

  getToDo(_id: string) {
    return this.toDo.find((object) => object._id === _id);
  }

  refreshToDoList() {
    this.fetchToDo().subscribe({
      next: (response) => {
        this.toDoListChange.next(response);
      },
    });
    // this.toDoListChange.next(this.toDo.slice());
  }
}
