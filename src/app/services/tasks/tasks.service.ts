import { Injectable } from '@angular/core';
import { Task } from '../tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [];
  remedioTask: Task[] = [];
  exercicioTask: Task[] = [];
  recreacaoTask: Task[] = [];
  taskSelected: Task;
  constructor() { }

  setTasks(tasks: Task[]){
    this.remedioTask = [];
    this.exercicioTask = [];
    this.recreacaoTask = [];
    if(tasks.length == 0){
      this.tasks = [];
    }
    else{
      this.tasks = tasks;
      for(let i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].task == "Remédio"){
          this.remedioTask.push(this.tasks[i]);        
        } else if(this.tasks[i].task == "Exercício"){
          this.exercicioTask.push(this.tasks[i]);
        } else{
          this.recreacaoTask.push(this.tasks[i]);
        }
      }
    }

  }

  getTasks(){
    return this.tasks.slice();
  }

  addTasks(task: Task){
    this.tasks.push(task);
    if(task.task == "Remédio"){
      this.remedioTask.push(task);
    } else if(task.task == "Exercício"){
      this.exercicioTask.push(task);
    } else{
      this.recreacaoTask.push(task);
    }
  }

  removeTasks(task: Task){
    this.tasks = this.tasks.filter(el => el.taskName !== task.taskName);
    if(task.task == "Remédio"){
      this.remedioTask = this.remedioTask.filter(el => el.taskName !== task.taskName);
    } else if(task.task == "Exercício"){
      this.exercicioTask = this.exercicioTask.filter(el => el.taskName !== task.taskName);
    } else{
      this.recreacaoTask = this.recreacaoTask.filter(el => el.taskName !== task.taskName);
    }
  }

  editTasks(task: Task){
    this.removeTasks(this.taskSelected);
    this.addTasks(task);
  }
}
