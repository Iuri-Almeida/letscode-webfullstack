import { Injectable } from '@angular/core';

import { TaskPriority } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoServicesService {

  constructor() { }

  getTasks() {
    return [
			{
				id: 1,
				title: 'Assistir a aula do curso Santander Coders',
				description: 'Devo reassistir a última aula de Angular parar revisar o conteúdo',
				dueDate: new Date(),
				priority: TaskPriority.LOW,
				labels: [],
				done: false
			},
			{
				id: 2,
				title: 'Fazer a atividade 05',
				description: 'Preciso terminar de fazer a atividade para entregar até sexta',
				dueDate: new Date(),
				priority: TaskPriority.HIGH,
				labels: [],
				done: false
			},
			{
				id: 3,
				title: 'Terminar módulo de Angular',
				description: 'Finalizaremos o módulo de Angular na sexta',
				dueDate: new Date(),
				priority: TaskPriority.MEDIUM,
				labels: [],
				done: false
			}
		];
  }
}
