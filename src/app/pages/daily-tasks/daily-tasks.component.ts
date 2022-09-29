import { Component, OnInit } from '@angular/core';
import { StepsService } from 'src/app/services/steps/steps.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.css']
})
export class DailyTasksComponent implements OnInit {

  constructor(
    private stepsService: StepsService,
    private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  getTarefas(){
    // return this.taskService.tasks;
  }

  getHeader(){
    return this.stepsService.header;
  }

  getTarefasRemedio(){
    console.log(this.tasksService.remedioTask);
    return this.tasksService.remedioTask;
  }

  getTarefasExercicio(){
    console.log(this.tasksService.exercicioTask)
    return this.tasksService.exercicioTask;
  }

  getTarefasRecreacao(){
    return this.tasksService.recreacaoTask;
  }

  onClickEdit(){
    this.stepsService.goTo('Nova Tarefa', 21);
  }

}
