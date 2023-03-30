import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ToDoSiteResolver } from './toDo.resolver';
import { ToDoListComponent } from './to-do-list.component';

const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
    // resolve: { todo: ToDoSiteResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoListRoutingModule {}
