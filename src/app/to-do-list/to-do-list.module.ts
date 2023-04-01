import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToDoListRoutingModule } from './to-do-list-routing.module';
import { ToDoListComponent } from './to-do-list.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { SortComponent } from './sort/sort.component';

@NgModule({
  declarations: [ToDoListComponent, ProgressBarComponent, SearchBarComponent, FiltersComponent, SortComponent],

  imports: [
    RouterModule,
    ToDoListRoutingModule,
    CommonModule,
    MatIconModule,
    FormsModule,
  ],
})
export class ToDoListModule {}
