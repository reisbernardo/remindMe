import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
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
    private tasksService: TasksService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  removeTarefa(tarefaNome: string, tarefa: string){
    console.log("taskName", tarefaNome);
    console.log("task", tarefa)
    this.tasksService.removeTasks(tarefaNome, tarefa);
    this.dataStorageService.storeData("tasks");
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
