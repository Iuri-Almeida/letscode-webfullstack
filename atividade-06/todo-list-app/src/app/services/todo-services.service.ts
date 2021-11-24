import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Task, TaskPriority } from 'src/app/models/task.model';

const URL = 'http://madsti.com.br:9099/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoServicesService {

  private tasks = this.http.get<Task[]>(URL);

  taskList: Task[] = [];

  constructor(private http: HttpClient, private router: Router) {
    // this.tasks.forEach(task => task.forEach(item => this.taskList.push(item)));
  }

  getGambi() {
    return this.http.get<Task[]>(URL);
  }

  getTasks() {
	  return this.taskList;
  }

  addTask(task: Task): void {

    this.taskList.push(task);
    
    this.router.navigate([''], {queryParams: {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      labels: task.labels,
      done: task.done
    }});
  }

  deleteTask(task: Task): void {
    const index = this.taskList.indexOf(task);
    
    if (index > -1) {
      this.taskList.splice(index, 1);
    } else {
      alert('Task not found!')
    }

    this.router.navigate(['']);
  }

  updateTask(task: Task, oldTask: Task): void {
    this.taskList.forEach((e, i) => {
      if (e.id === oldTask.id) {
        this.taskList[i] = task;
      }
    });

    this.router.navigate([''], {queryParams: {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      labels: task.labels,
      done: task.done,
      update: true
    }});
  }

}
