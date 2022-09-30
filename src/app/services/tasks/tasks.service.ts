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
    if(tasks.length == 0){
      this.tasks = [];
      this.remedioTask = [];
      this.exercicioTask = [];
      this.recreacaoTask = [];
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

  removeTasks(taskName: string, task: string){
    this.tasks = this.tasks.filter(el => el.taskName !== taskName);
    if(task == "Remédio"){
      this.remedioTask = this.remedioTask.filter(el => el.taskName !== taskName);
    } else if(task == "Exercício"){
      this.exercicioTask = this.exercicioTask.filter(el => el.taskName !== taskName);
    } else{
      this.recreacaoTask = this.recreacaoTask.filter(el => el.taskName !== taskName);
    }
  }

  editTasks(task: Task){
    let index = this.tasks.findIndex(x => x.taskName == this.taskSelected.taskName);
    this.tasks[index] = task;
    if(this.taskSelected.task == "Remédio"){
      this.remedioTask[index] = task;
    } else if(this.taskSelected.task == "Exercício"){
      this.exercicioTask[index] = task;
    } else{
      this.recreacaoTask[index] = task;
    }
  }
}
