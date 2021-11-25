import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Task, TaskPriority } from 'src/app/models/task.model';
import { TodoServicesService } from 'src/app/services/todo-services.service';

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

	tasksList: Task[] = [];

	gambi?: Observable<Task[]>;

	constructor(private todoListService: TodoServicesService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		let id = this.route.snapshot.queryParamMap.get('id');
		let title = this.route.snapshot.queryParamMap.get('title');
		let description = this.route.snapshot.queryParamMap.get('description');
		let dueDate = this.route.snapshot.queryParamMap.get('dueDate');
		let priority: TaskPriority;
		let labels = this.route.snapshot.queryParamMap.get('labels');
		let done = this.route.snapshot.queryParamMap.get('done');
		let update = this.route.snapshot.queryParamMap.get('update');

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

		let new_task: Task | undefined;
		
		if (id != null && 
			title != null && 
			description != null 
			&& dueDate != null 
			&& priority != null 
			&& labels != null 
			&& done != null) {
			new_task = {
				id: id,
				title: title,
				description: description,
				dueDate: new Date(dueDate),
				priority: priority,
				labels: [],
				done: done === 'true'
			}
		}
		
		this.tasksList = this.todoListService.getTasks();
		this.gambi = this.todoListService.getGambi();

		if (new_task) {
			if (update == 'true') {
				this.tasksList.forEach((e, i) => {
					if (e.id == new_task?.id) {
						this.tasksList[i] = new_task;
					}
				})
				console.log('cheguei')
			}
			this.tasksList.push(new_task);
		}
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

	deleteTask(task: Task): void {
		this.todoListService.deleteTask(task);
	}

	updateTask(task: Task): void {
		this.router.navigate(['create-task'], {queryParams: {
			id: task.id,
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
			priority: task.priority,
			labels: task.labels,
			done: task.done
		}});
	}

}
