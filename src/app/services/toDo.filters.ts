import { Injectable } from '@angular/core';
import { ToDoObject } from 'src/model/toDo.model';
import { Subject } from 'rxjs';
import { EDITED_ITEM_MOCK } from './toDo.services';

export type sortBy = 'Done' | 'Name' | 'None';
type filters = 'search' | 'byName' | 'sort';
type editFilter = { name: filters; value: string | sortBy };

@Injectable({
  providedIn: 'root',
})
export class toDoFiltersService {
  private searchValue: string = '';
  private filterNameValue: string = 'Show All';
  private sortByValue: sortBy = 'None';
  toDoFilteredChange = new Subject<ToDoObject[]>();

  filter(toDos: ToDoObject[], filter: editFilter): ToDoObject[] {
    this.setFilterValue(filter);

    let toDoFiltered: ToDoObject[] = [EDITED_ITEM_MOCK];
    toDoFiltered = this.searchToDo(toDos, this.searchValue);
    toDoFiltered = this.filterByName(toDoFiltered, this.filterNameValue);
    toDoFiltered = this.sortBy(toDoFiltered, this.sortByValue);
    return toDoFiltered;
  }

  sortBy(toDos: ToDoObject[], sortBy: sortBy): ToDoObject[] {
    switch (sortBy) {
      case 'Name':
        return toDos.sort((a, b) =>
          a.userName > b.userName ? 1 : b.userName > a.userName ? -1 : 0
        );
      case 'Done':
        return toDos.sort(
          (a, b) => (a.isDone === b.isDone ? 0 : a.isDone ? -1 : 1) // 1 : -1 for false first
        );
      default: //None
        return toDos;
    }
  }

  searchToDo(toDos: ToDoObject[], searchValue: string): ToDoObject[] {
    if (searchValue === '') return toDos;
    return toDos.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  filterByName(toDos: ToDoObject[], name: string) {
    if (name === 'Show All') return toDos;
    return toDos.filter((obj) => obj.userName === name);
  }

  setFilterValue(filter: editFilter) {
    switch (filter.name) {
      case 'search':
        this.setSearchValue(filter.value as string);
        break;
      case 'byName':
        this.setFilteredNameValue(filter.value as string);
        break;
      case 'sort':
        this.setSortByValue(filter.value as sortBy);
        break;
      default:
        console.error('wrong filter name');
        break;
    }
  }

  setSearchValue(value: string) {
    this.searchValue = value;
  }

  setFilteredNameValue(value: string) {
    this.filterNameValue = value;
  }

  setSortByValue(value: sortBy) {
    this.sortByValue = value;
  }
}
