import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDirective } from './app.directive';



@NgModule({
  declarations: [
    AppDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppDirective
  ]
})
export class DirectivesModule { }
