import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoManageComponent } from './todo-manage/todo-manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo-manage', pathMatch: 'full' },
  { path: 'todo-manage', component: TodoManageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
