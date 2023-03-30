import { Component, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToDoApiService } from 'src/app/api/toDo.api';
import { ToDoObject } from 'src/model/toDo.model';
import { ToDoService } from '../services/toDo.services';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass'],
})
export class ToDoListComponent {
  toDoSubscription: Subscription = new Subscription();
  toDos: ToDoObject[] = [];
  statusInPercentage = '60%';
  numberOfTasks = 2;
  tasksDone = 1;

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.toDos = this.toDoService.getToDos();
    // this.toDoSubscription = this.toDoService.toDoListChange.subscribe(
    //   (ToDoData: ToDoObject[]) => {
    //     this.toDos = ToDoData;
    //   }
    // );
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
  }

  // ngOnDestroy() {
  //   this.toDoSubscription.unsubscribe();
  // }
}
