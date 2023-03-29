import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';

@NgModule({
  declarations: [AddComponent],
  imports: [
    RouterModule,
    AddRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
})
export class AddModule {}
