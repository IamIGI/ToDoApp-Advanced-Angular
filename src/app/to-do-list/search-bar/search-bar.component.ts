import { Component } from '@angular/core';
import { ToDoService } from 'src/app/services/toDo.services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass'],
})
export class SearchBarComponent {
  enteredSearchValue: string = '';

  constructor(private toDoService: ToDoService) {}

  onSearchTextChange() {
    this.toDoService.searchToDo(this.enteredSearchValue);
  }
}
