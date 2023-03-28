import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  {
    path: 'todo',
    loadChildren: () =>
      import('./to-do-list/to-do-list.module').then(
        (module) => module.ToDoListModule
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./add/add.module').then((module) => module.AddModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
