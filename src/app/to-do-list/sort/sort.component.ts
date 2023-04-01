import { Component } from '@angular/core';
import DATA from 'src/app/data/global.data';
import { ToDoService } from 'src/app/services/toDo.services';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.sass'],
})
export class SortComponent {
  showFilters: boolean = false;
  sortOptions: string[] = DATA.SORT_OPTIONS;
  assignedSortOption: string = DATA.SORT_OPTIONS[0];

  constructor(private toDoService: ToDoService) {}

  showSortOptions() {
    this.showFilters = !this.showFilters;
  }

  setSortOption(index: number) {
    this.assignedSortOption = this.sortOptions[index];
    this.toDoService.sortBy(this.assignedSortOption);
    // this.toDoService.filterByName(this.filterOptions[index]);
  }
}
