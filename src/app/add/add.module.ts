import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';

@NgModule({
  declarations: [AddComponent],
  imports: [RouterModule, AddRoutingModule],
})
export class AddModule {}
