import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
