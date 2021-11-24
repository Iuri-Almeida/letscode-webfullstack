import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Task, TaskPriority } from 'src/app/models/task.model';
import { TodoServicesService } from 'src/app/services/todo-services.service';

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

	// tasksList: Task[] = [];
	tasksList?: Observable<Task[]>;

	constructor(private todoListService: TodoServicesService) {}

	ngOnInit(): void {
		this.tasksList = this.todoListService.getTasks();
	}

	getColor(priority: TaskPriority): string {
		switch (priority) {
			case TaskPriority.LOW:
				return '#f5e769'
			case TaskPriority.MEDIUM:
				return '#f5b869'
			case TaskPriority.HIGH:
				return '#f56969'
			default:
				return '#fff'
		}
	}

	getClass(priority: TaskPriority): string {
		switch (priority) {
			case TaskPriority.LOW:
				return 'low'
			case TaskPriority.MEDIUM:
				return 'medium'
			case TaskPriority.HIGH:
				return 'high'
			default:
				return ''
		}
	}

	markAsDone(task: Task): void {
		task.done = !task.done
		let title: HTMLElement | null = document.getElementById(`title-${task.id}`);
		if (task.done && title) {
			title.style.backgroundColor = '#ccc'
		} else if (title){
			title.style.backgroundColor = this.getColor(task.priority)
		}
	}

}
