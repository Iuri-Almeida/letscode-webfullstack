import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TaskPriority } from 'src/app/models/task.model';
import { TodoServicesService } from 'src/app/services/todo-services.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  selectedPriority?: TaskPriority;
  priorityOptions = [
    { name: 'Baixa', value: 0},
    { name: 'Média', value: 1},
    { name: 'Alta', value: 2}
  ];

  createTaskForm?: FormGroup;

  constructor(private todoService: TodoServicesService) { }

  ngOnInit(): void {
    this.createTaskForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'date': new FormControl(null),
      'priority': new FormControl(null)
    })
  }

  onSubmit(): void {
    let title = this.createTaskForm?.controls['title'].value;
    let description = this.createTaskForm?.controls['description'].value;
    let dueDate = this.createTaskForm?.controls['date'].value;
    let priority = this.selectedPriority;

    if (priority == undefined) {
      priority = TaskPriority.LOW;
    }

    this.todoService.addTask(title, description, dueDate, priority);
  }

  selectedOption(option: any): void {
    switch (option.value) {
      case 0:
        this.selectedPriority = TaskPriority.LOW;
        break;
      case 1:
        this.selectedPriority = TaskPriority.MEDIUM;
        break;
      case 2:
        this.selectedPriority = TaskPriority.HIGH;
        break;
    }
  }

}
