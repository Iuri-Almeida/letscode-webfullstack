import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

import { TodoListComponent } from './todo-list/todo-list.component';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  exports: [
    TodoListComponent
  ]
})
export class PagesModule { }
