import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ToDoObject } from 'src/model/toDo.model';
import { ToDoService } from '../services/toDo.services';

export const ToDoSiteResolver: ResolveFn<ToDoObject[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ToDoService).fetchToDo();
};
