import { Component, OnInit } from '@angular/core';
import { StepsService } from 'src/app/services/steps/steps.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private stepsService: StepsService,
    private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  onGoToCreateTask(){
    this.stepsService.goTo("Nova Tarefa", 21);
  }

  onGoToTarefa(task: string){
    this.stepsService.goTo(task, 3);
  }

  getTarefas(){
    return this.tasksService.tasks;
  }

}
