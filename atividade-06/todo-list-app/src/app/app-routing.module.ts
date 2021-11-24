import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task',
    component: CreateTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
