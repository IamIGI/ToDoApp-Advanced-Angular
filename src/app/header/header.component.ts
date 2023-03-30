import { Component } from '@angular/core';
import { ToDoService } from '../services/toDo.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(private toDoService: ToDoService) {}

  onNewToDo() {
    this.toDoService.clearEditedItemObject();
  }
}
