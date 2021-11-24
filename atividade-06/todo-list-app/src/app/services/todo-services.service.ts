import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task, TaskPriority } from 'src/app/models/task.model';

const URL = 'http://madsti.com.br:9099/todos';

@Injectable()
export class TodoServicesService {

  constructor(private http: HttpClient) { }
//   constructor() { }

  getTasks() {
	  return this.http.get<Task[]>(URL)
    // return [
	// 		{
	// 			id: 1,
	// 			title: 'Assistir a aula do curso Santander Coders',
	// 			description: 'Devo reassistir a última aula de Angular parar revisar o conteúdo',
	// 			dueDate: new Date(),
	// 			priority: TaskPriority.LOW,
	// 			labels: [],
	// 			done: false
	// 		},
	// 		{
	// 			id: 2,
	// 			title: 'Fazer a atividade 05',
	// 			description: 'Preciso terminar de fazer a atividade para entregar até sexta',
	// 			dueDate: new Date(),
	// 			priority: TaskPriority.HIGH,
	// 			labels: [],
	// 			done: false
	// 		},
	// 		{
	// 			id: 3,
	// 			title: 'Terminar módulo de Angular',
	// 			description: 'Finalizaremos o módulo de Angular na sexta',
	// 			dueDate: new Date(),
	// 			priority: TaskPriority.MEDIUM,
	// 			labels: [],
	// 			done: false
	// 		}
	// 	];
  }
}
