import { Injectable } from '@angular/core';
import { ProfilesService } from '../profiles/profiles.service';
import { Task } from '../tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [];
  remediosTask: Task[] = [];
  exerciciosTask: Task[] = [];
  recreacaoTask: Task[] = [];
  constructor(private profilesService: ProfilesService) { }

  dividePerTask(element: Task, index: number, array: Task[]){
    element.task;
  }

  setTasks(tasks: Task[]){
    this.tasks = tasks;
    this.tasks.forEach(this.dividePerTask);
  }

  getTasks(){
    return this.tasks.slice();
  }

  addTasks(task: Task){
    this.tasks.push(task);
    console.log("this.tasks: ", this.tasks);
    // this.profilesService.addTasks(this.tasks);
  }
}
