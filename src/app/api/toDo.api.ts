import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ToDoObject } from 'src/model/toDo.model';
import { ToDoService } from '../services/toDo.services';

@Injectable({
  providedIn: 'root',
})
export class ToDoApiService {
  URL = 'http://localhost:5000/todolist';

  constructor(private http: HttpClient, private toDoService: ToDoService) {}

  fetchRecipes() {
    return this.http.get<ToDoObject[]>(this.URL + '/all').pipe(
      tap((toDoData) => {
        this.toDoService.setToDo(toDoData);
      })
    );
  }
}
