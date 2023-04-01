import { Component } from '@angular/core';
import { ToDoService } from 'src/app/services/toDo.services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
})
export class FiltersComponent {
  showPeoples: boolean = false;
  peoples: string[] = ['Igor', 'Anna', 'Bartek'];
  assignedPerson: string = this.peoples[0];

  constructor(private toDoService: ToDoService) {}

  setShowPeoples() {
    this.showPeoples = !this.showPeoples;
  }

  setPerson(index: number) {
    this.assignedPerson = this.peoples[index];
    this.toDoService.filterByName(this.peoples[index]);
  }
}
