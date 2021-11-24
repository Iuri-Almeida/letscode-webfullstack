import { Component } from '@angular/core';

import { TodoServicesService } from './services/todo-services.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoServicesService]
})
export class AppComponent {
  title = 'todo-list-app';
}
