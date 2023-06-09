import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  toDoSubscription = new Subscription();
  toDos: ToDoObject[] = [];

  isLoading = false;

  constructor(private toDoService: ToDoService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.toDoObservable = this.toDoService.fetchToDo();

    this.toDoObservable.subscribe({
      next: () => {
        this.toDos = this.toDoService.getToDos();
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

  onEdit(_id: string) {
    this.toDoService.setEditedItem(_id);
    this.navigateToFormPage();
  }

  onIsDoneChange(_id: string) {
    this.toDoService.isDoneUpdate(_id);
  }

  onDelete(_id: string) {
    this.toDoService.deleteToDo(_id);
  }

  navigateToFormPage() {
    this.router.navigate(['/add']);
  }

  ngOnDestroy() {
    this.toDoSubscription.unsubscribe();
  }
}
