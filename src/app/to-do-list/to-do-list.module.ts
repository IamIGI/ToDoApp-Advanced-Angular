import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { ToDoListComponent } from './to-do-list.component';

@NgModule({
  declarations: [ToDoListComponent],
  imports: [RouterModule, ToDoListRoutingModule, CommonModule],
})
export class ToDoListModule {}
