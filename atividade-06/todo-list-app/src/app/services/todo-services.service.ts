import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task, TaskPriority } from 'src/app/models/task.model';

const URL = 'http://madsti.com.br:9099/todos';

@Injectable()
export class TodoServicesService {

  constructor(private http: HttpClient) { }

  getTasks() {
	  return this.http.get<Task[]>(URL)
  }
}
