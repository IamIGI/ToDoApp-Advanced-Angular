import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoService } from '../services/toDo.services';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
})
export class AddComponent {
  addTaskForm!: FormGroup;
  showPeoples: boolean = false;
  peoples: string[] = ['Igor', 'Anna', 'Bartek'];
  assignedPerson: string = this.peoples[0];
  forbiddenTaskDictionaries = ['nothing', 'eating', 'sleeping'];

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.addTaskForm = new FormGroup({
      taskName: new FormControl(null, [
        Validators.required,
        this.forbiddenTasks.bind(this),
      ]),
      assignPerson: new FormControl(this.peoples[0]),
    });
  }

  onSubmit() {
    const toDoObject = {
      userName: this.addTaskForm.value.assignPerson,
      title: this.addTaskForm.value.taskName,
    };
    this.toDoService.createToDo(toDoObject).subscribe();

    this.setPerson(0);
    this.addTaskForm.reset();
  }

  setShowPeoples() {
    this.showPeoples = !this.showPeoples;
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
}
