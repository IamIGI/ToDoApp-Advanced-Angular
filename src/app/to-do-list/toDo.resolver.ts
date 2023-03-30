import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ToDoObject } from 'src/model/toDo.model';
// import { ToDoApiService } from '../api/toDo.api';
import { ToDoService } from '../services/toDo.services';

export const toDoResolver: ResolveFn<ToDoObject[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ToDoService).fetchToDo();
};
