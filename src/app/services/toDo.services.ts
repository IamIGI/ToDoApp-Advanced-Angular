import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Subject } from 'rxjs';
import { ToDoObject } from 'src/model/toDo.model';
import { ToDoApiService } from '../api/toDo.api';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  toDoListChange = new Subject<ToDoObject[]>();

  private toDo: ToDoObject[] = [];

  setToDo(toDo: ToDoObject[]) {
    this.toDo = toDo;
    this.refreshToDoList();
  }

  getToDos() {
    return this.toDo.slice();
  }

  getToDo(_id: string) {
    return this.toDo.find((object) => object._id === _id);
  }

  refreshToDoList() {
    this.toDoListChange.next(this.toDo.slice());
  }
}

export const toDoResolver: ResolveFn<ToDoObject[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ToDoApiService).fetchRecipes();
};
