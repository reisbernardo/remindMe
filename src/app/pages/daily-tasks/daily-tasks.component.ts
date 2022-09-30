import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { StepsService } from 'src/app/services/steps/steps.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from 'src/app/services/tasks/task.model';

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
    this.tasksService.removeTasks(tarefaNome, tarefa);
    this.dataStorageService.storeData("tasks");
    if(this.getTarefas().length == 0) this.stepsService.goBack();
  }

  getTarefas(){
    if(this.stepsService.header == "Remédios"){
      return this.tasksService.remedioTask;
    } else if(this.stepsService.header == "Exercícios"){
      return this.tasksService.exercicioTask;
    } else{
      return this.tasksService.recreacaoTask;
    }
  }

  onClickEdit(tarefa: Task){
    this.tasksService.taskSelected = tarefa;
    this.stepsService.goTo('Alterar Tarefa', 21);
  }

}
