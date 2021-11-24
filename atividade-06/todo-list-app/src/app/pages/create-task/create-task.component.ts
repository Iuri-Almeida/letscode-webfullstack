import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Task, TaskPriority } from 'src/app/models/task.model';
import { TodoServicesService } from 'src/app/services/todo-services.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTaskForm?: FormGroup;

  oldTask?: Task;

  hasChangedPriority: boolean = false;

  constructor(private todoService: TodoServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.route.snapshot.queryParamMap.get('id');
		let title = this.route.snapshot.queryParamMap.get('title');
		let description = this.route.snapshot.queryParamMap.get('description');
		let dueDate = this.route.snapshot.queryParamMap.get('dueDate');
		let priority: TaskPriority;
		let labels: string[] = [];  // this.route.snapshot.queryParamMap.get('labels');
		let done = this.route.snapshot.queryParamMap.get('done');
    
    switch (this.route.snapshot.queryParamMap.get('priority')) {
			case 'LOW':
				priority = TaskPriority.LOW;
				break;
			case 'MEDIUM':
				priority = TaskPriority.MEDIUM;
				break;
			case 'HIGH':
				priority = TaskPriority.HIGH;
				break;
			default:
				priority = TaskPriority.LOW;
				break;
		}

    if (id != null && 
			title != null && 
			description != null 
			&& dueDate != null 
			&& priority != null 
			&& done != null) {
			this.oldTask = {
				id: id,
				title: title,
				description: description,
				dueDate: new Date(dueDate),
				priority: priority,
				labels: labels,
				done: done === 'true'
			}
		}

    this.createTaskForm = new FormGroup({
      'title': new FormControl(this.oldTask ? this.oldTask.title : null),
      'description': new FormControl(this.oldTask ? this.oldTask.description : null),
      'date': new FormControl(this.oldTask ? this.oldTask.dueDate : null),
      'priority': new FormControl(this.oldTask ? this.oldTask.priority : null)
    })
  }

  onSubmit(): void {
    let title = this.createTaskForm?.controls['title'].value;
    let description = this.createTaskForm?.controls['description'].value;
    let dueDate = this.createTaskForm?.controls['date'].value;
    let priority = this.createTaskForm?.controls['priority'].value;

    if (this.hasChangedPriority) {
      let inputPriority = document.getElementById('priority');
      if (inputPriority) {
        priority = inputPriority.getAttribute('value');
      }

      if (priority == 'Baixa') {
        priority = TaskPriority.LOW;
      } else if (priority == 'Média') {
        priority = TaskPriority.MEDIUM;
      } else {
        priority = TaskPriority.HIGH;
      }
    }

    let task: Task = {
      id: `${Math.random()}`,
      title: title,
      description: description,
      dueDate: new Date(Date.parse(dueDate)),
      priority: priority,
      labels: [],
      done: false
    }

    if (this.oldTask) {
      this.todoService.updateTask(task, this.oldTask);
    } else {
      this.todoService.addTask(task);
    }

  }

  selectedOption(event: any): void {
    this.hasChangedPriority = true;
    let inputPriority = document.getElementById('priority');
    if (inputPriority) {
      inputPriority.setAttribute('value', event.target.textContent);
    }
  }

}
