import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = ["Tarefa A", "Tarefa B", "Tarefa C"];
  constructor() { }
}
