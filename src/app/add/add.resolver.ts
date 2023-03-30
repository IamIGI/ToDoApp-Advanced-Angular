import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ToDoService } from '../services/toDo.services';

export const AddSiteResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ToDoService).clearEditedItemObject();
};
