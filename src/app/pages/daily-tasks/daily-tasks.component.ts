import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { StepsService } from 'src/app/services/steps/steps.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from 'src/app/services/tasks/task.model';
import { AlarmService } from 'src/app/services/alarm/alarm.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.css']
})
export class DailyTasksComponent implements OnInit {

  constructor(
    private stepsService: StepsService,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private alarmService: AlarmService,
    private modalService: ModalService,
    ) { }

  ngOnInit(): void {
    if(this.getTarefas().length == 0) this.stepsService.goBack();
  }

  removeTarefa(tarefa: Task){
    this.modalService.openModal('confirmation', 'Você realmente deseja remover esta tarefa?', 'Não', 'Sim')
    .then((confirmed) => {
      if(!confirmed) {
        this.tasksService.removeTasks(tarefa);
        this.alarmService.removeAlarm(tarefa);
        this.dataStorageService.storeData("tasks");
        if(this.getTarefas().length == 0) this.stepsService.goBack();
      }
    }).catch(() => {return});

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

  translateWeekDay(arr: any[]){
    let finalArray = ''
    if(arr.length == 7) return 'Todos os Dias';
    arr.forEach(el => {
      switch(el){
        case '0': 
          finalArray += 'DOM, ';
          return;
        case '1':
          finalArray += 'SEG, ';
          return;
        case '2':
          finalArray += 'TER, ';
          return;
        case '3':
          finalArray += 'QUA, ';
          return;
        case '4':
          finalArray += 'QUI, ';
          return;
        case '5':
          finalArray += 'SEX, ';
          return;
        case '6':
          finalArray += 'SAB, ';
          return;
      }
    });
    if(finalArray == 'SEG, TER, QUA, QUI, SEX, ') return 'Todos os Dias Úteis';
    if(finalArray == 'DOM, SAB, ') return 'Finais de Semana';
    return finalArray.slice(0, -2);
  }

  onClickEdit(tarefa: Task){
    this.tasksService.taskSelected = tarefa;
    this.stepsService.goTo('Alterar Tarefa', 21);
  }

}
