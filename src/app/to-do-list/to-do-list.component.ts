import { Component, SimpleChange } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
// import { ToDoApiService } from 'src/app/api/toDo.api';
import { ToDoObject } from 'src/model/toDo.model';
import { ToDoService } from '../services/toDo.services';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass'],
})
export class ToDoListComponent {
  toDoObservable!: Observable<ToDoObject[]>;
  error: string | null = null;
  toDoSubscription: Subscription = new Subscription();
  toDos: ToDoObject[] = [];
  statusInPercentage = '60%';
  numberOfTasks = 2;
  tasksDone = 1;
  isLoading = false;

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.isLoading = true;
    this.toDoObservable = this.toDoService.fetchToDo();

    this.toDoObservable.subscribe({
      next: (response) => {
        this.toDos = response;
        this.isLoading = false;
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    this.toDoSubscription = this.toDoService.toDoListChange.subscribe(
      (ToDoData: ToDoObject[]) => {
        this.toDos = ToDoData;
      }
    );
  }
  onDelete(_id: string) {
    this.toDoService.deleteToDo(_id);
  }

  ngOnDestroy() {
    this.toDoSubscription.unsubscribe();
  }
}
