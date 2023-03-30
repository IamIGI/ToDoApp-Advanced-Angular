import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { toDoResolver } from '../services/toDo.services';
import { ToDoListComponent } from './to-do-list.component';

const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
    resolve: { todo: toDoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoListRoutingModule {}
