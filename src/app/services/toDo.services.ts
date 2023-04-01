import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ToDoCreateTaskResponse, ToDoObject } from 'src/model/toDo.model';

const EDITED_ITEM_MOCK = {
  _id: '',
  userName: '',
  title: '',
  isDone: false,
};

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  URL = 'http://localhost:5000/todolist';

  toDoListChange = new Subject<ToDoObject[]>();

  private toDo: ToDoObject[] = [];
  private toDoFiltered: ToDoObject[] = [];
  private editedItem: ToDoObject = EDITED_ITEM_MOCK;

  constructor(private http: HttpClient) {}

  fetchToDo() {
    return this.http.get<ToDoObject[]>(this.URL + '/all').pipe(
      tap((data) => {
        this.toDo = data;
        this.toDoFiltered = data;
      })
    );
  }

  searchToDo(searchValue: string) {
    if (searchValue === '') this.toDoFiltered = this.toDo;
    this.toDoFiltered = this.toDo.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    this.refreshToDoListWhenNoRequestWasMade();
  }

  createToDo(newToDo: { userName: string; title: string }) {
    return this.http.post<ToDoCreateTaskResponse>(this.URL + '/add', newToDo);
  }

  isDoneUpdate(_id: string) {
    return this.http.patch(this.URL + '/isDoneEdit', { id: _id }).subscribe({
      next: () => {
        this.downloadAndRefreshNewToDoList();
      },
    });
  }

  updateToDo(id: string, title: string, userName: string) {
    const updateObject = {
      id,
      title,
      userName,
    };
    return this.http.patch(this.URL + '/edit', updateObject);
  }

  deleteToDo(_id: string) {
    return this.http.delete(this.URL + '/delete/' + _id).subscribe({
      next: () => {
        this.downloadAndRefreshNewToDoList();
      },
    });
  }

  setEditedItem(_id: string) {
    const searchedToDoItem = this.toDo.find((obj) => obj._id === _id);
    if (searchedToDoItem !== undefined) this.editedItem = searchedToDoItem;
  }

  getEditedItem() {
    return this.editedItem;
  }

  clearEditedItemObject() {
    this.editedItem = EDITED_ITEM_MOCK;
  }

  getToDos() {
    console.log(this.toDoFiltered);
    return this.toDoFiltered.slice();
  }

  getToDo(_id: string) {
    return this.toDoFiltered.find((object) => object._id === _id);
  }

  refreshToDoListWhenNoRequestWasMade() {
    this.toDoListChange.next(this.toDoFiltered);
  }

  downloadAndRefreshNewToDoList() {
    this.fetchToDo().subscribe({
      next: (response) => {
        this.toDoListChange.next(response);
      },
    });
  }
}
