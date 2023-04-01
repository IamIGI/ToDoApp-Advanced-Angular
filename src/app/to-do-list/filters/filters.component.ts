import { Component } from '@angular/core';
import { ToDoService } from 'src/app/services/toDo.services';
import DATA from 'src/app/data/global.data';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
})
export class FiltersComponent {
  showPeoples: boolean = false;
  peoples: string[] = DATA.PEOPLE;
  assignedPerson: string = '';

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.peoples.splice(0, 0, 'Show All');
    this.assignedPerson = this.peoples[0];
  }

  setShowPeoples() {
    this.showPeoples = !this.showPeoples;
  }

  setPerson(index: number) {
    this.assignedPerson = this.peoples[index];
    this.toDoService.filterByName(this.peoples[index]);
  }
}
