import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add.component';
// import { AddSiteResolver } from './add.resolver';

const routes: Routes = [
  {
    path: '',
    component: AddComponent,
    // resolve: { add: AddSiteResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRoutingModule {}
