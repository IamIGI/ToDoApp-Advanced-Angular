import { Injectable } from '@angular/core';
import { ToDoObject } from 'src/model/toDo.model';
import { Subject } from 'rxjs';
import { EDITED_ITEM_MOCK } from './toDo.services';

type sortBy = 'name' | 'date' | 'isDone' | null;
type filters = 'search' | 'byName' | 'sort';
type editFilter = { name: filters; value: string | sortBy };

@Injectable({
  providedIn: 'root',
})
export class toDoFiltersService {
  private searchValue: string = '';
  private filterNameValue: string = 'All';
  private sortByValue: sortBy = null;
  //   toFoFiltered: ToDoObject[] = [EDITED_ITEM_MOCK];
  toDoFilteredChange = new Subject<ToDoObject[]>();

  filter(toDos: ToDoObject[], filter: editFilter): ToDoObject[] {
    this.setFilterValue(filter);

    let toDoFiltered: ToDoObject[] = [EDITED_ITEM_MOCK];
    console.log(toDos);
    toDoFiltered = this.searchToDo(toDos, this.searchValue);
    console.log(toDoFiltered);
    toDoFiltered = this.filterByName(toDoFiltered, this.filterNameValue);
    console.log(toDoFiltered);
    return toDoFiltered;
  }

  searchToDo(toDos: ToDoObject[], searchValue: string): ToDoObject[] {
    if (searchValue === '') return toDos;
    return toDos.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    // this.refreshToDoListWhenNoRequestWasMade();
  }

  filterByName(toDos: ToDoObject[], name: string) {
    if (name === 'Show All') return toDos;
    return toDos.filter((obj) => obj.userName === name);

    // this.refreshToDoListWhenNoRequestWasMade();
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
