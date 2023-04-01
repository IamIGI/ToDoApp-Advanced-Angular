import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoService } from '../services/toDo.services';
import DATA from 'src/app/data/global.data';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
})
export class AddComponent {
  addTaskForm!: FormGroup;
  showPeoples: boolean = false;
  peoples: string[] = DATA.PEOPLE;
  assignedPerson = this.peoples[0];
  forbiddenTaskDictionaries = ['nothing', 'eating', 'sleeping'];
  editedToDoItem_id: string = '';

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.addTaskForm = new FormGroup({
      taskName: new FormControl(null, [
        Validators.required,
        this.forbiddenTasks.bind(this),
      ]),
      assignPerson: new FormControl(this.peoples[0]),
    });

    this.editToDoItem();
  }

  onSubmit() {
    const toDoObject = {
      userName: this.addTaskForm.value.assignPerson,
      title: this.addTaskForm.value.taskName,
    };

    if (this.editedToDoItem_id) {
      this.toDoService
        .updateToDo(
          this.editedToDoItem_id,
          toDoObject.title,
          toDoObject.userName
        )
        .subscribe();
    } else {
      this.toDoService.createToDo(toDoObject).subscribe();
    }

    this.resetForm();
  }

  setShowPeoples() {
    this.showPeoples = !this.showPeoples;
  }

  editToDoItem() {
    const editedItem = this.toDoService.getEditedItem();
    if (editedItem._id) {
      this.editedToDoItem_id = editedItem._id;
      this.addTaskForm.patchValue({
        taskName: editedItem.title,
      });
      const indexOfEditedPerson = this.peoples.indexOf(editedItem.userName);
      this.setPerson(indexOfEditedPerson);
    }
  }

  setPerson(index: number) {
    this.assignedPerson = this.peoples[index];
    this.addTaskForm.patchValue({
      assignPerson: this.assignedPerson,
    });
  }

  forbiddenTasks(control: FormControl): { [key: string]: boolean } | null {
    if (
      this.forbiddenTaskDictionaries.indexOf(control.value?.toLowerCase()) !==
      -1
    ) {
      return { taskIsForbidden: true };
    }
    return null;
  }

  resetForm() {
    this.setPerson(0);
    this.addTaskForm.reset();
    this.toDoService.clearEditedItemObject();
    this.editedToDoItem_id = '';
  }
}
