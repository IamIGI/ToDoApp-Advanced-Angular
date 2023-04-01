import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToDoService } from 'src/app/services/toDo.services';
import { ToDoObject } from 'src/model/toDo.model';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
})
export class ProgressBarComponent {
  statusInPercentage = '0%';
  numberOfTasks = 0;
  tasksDone = 0;
  toDoSubscription = new Subscription();

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    const toDos = this.toDoService.getToDos();
    this.changePercentage(toDos);

    this.toDoSubscription = this.toDoService.toDoListChange.subscribe(
      (toDos) => {
        this.changePercentage(toDos);
      }
    );
  }

  changePercentage(toDos: ToDoObject[]) {
    this.numberOfTasks = toDos.length;
    this.tasksDone = this.countNumberOfDoneTasks(toDos);
    this.statusInPercentage = this.getPercentageOfDoneTasks(
      this.numberOfTasks,
      this.tasksDone
    );
  }

  countNumberOfDoneTasks(toDos: ToDoObject[]): number {
    const countedObjects = toDos.filter((obj) => obj.isDone).length;
    return countedObjects;
  }

  getPercentageOfDoneTasks(numberOfTasks: number, tasksDone: number): string {
    const percentage = String((tasksDone * 100) / numberOfTasks);
    const valueForCssStyles = `${percentage}%`;
    return valueForCssStyles;
  }

  ngOnDestroy() {
    this.toDoSubscription.unsubscribe();
  }
}
