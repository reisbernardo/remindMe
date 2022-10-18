import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { ProfilesService } from 'src/app/services/profiles/profiles.service';
import { StepsService } from 'src/app/services/steps/steps.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  buttonLabel = 'Adicionar Tarefa';
  taskForm: FormGroup;
  tasks = ["Remédio", "Exercício", "Recreação"];
  days = [
    // {
    //   day: 'Everyday',
    //   id: -1
    // },
    {
      day: 'DOM',
      id: 0
    },
    {
      day: 'SEG',
      id: 1
    },
    {
      day: 'TER',
      id: 2
    },
    {
      day: 'QUA',
      id: 3
    },
    {
      day: 'QUI',
      id: 4
    },
    {
      day: 'SEX',
      id: 5
    },
    {
      day: 'SAB',
      id: 6
    }
  ];
  constructor(
    private stepsService: StepsService,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private profilesService: ProfilesService) { }

  ngOnInit(): void {
    let taskSelected: string;
    let taskNameSelected: string;
    let taskDaysSelected: number[];
    let taskTimeSelected: string;
    if(this.stepsService.previousStep == 3){
      taskSelected = this.tasksService.taskSelected.task;
      taskNameSelected = this.tasksService.taskSelected.taskName;
      taskDaysSelected = this.tasksService.taskSelected.weekDay;
      taskTimeSelected = this.tasksService.taskSelected.time;
      this.buttonLabel = 'Alterar Tarefa';
    }
    this.taskForm = new FormGroup({
      'task': new FormControl(taskSelected),
      'taskName': new FormControl(taskNameSelected, [Validators.required, Validators.maxLength(30)]),
      'days': new FormArray([]),
      // 'day1': new FormControl(taskDaySelected, [Validators.required]),
      'time': new FormControl(taskTimeSelected, [Validators.required]),
  },)
  }

  onSubmit(){
    console.log("this.taskForm.value: ", this.taskForm.value)
    if(this.stepsService.previousStep == 3) {
      this.tasksService.editTasks(this.taskForm.value);
      this.dataStorageService.storeData('tasks');
      this.stepsService.goBack();
    }
    else {
      this.tasksService.addTasks(this.taskForm.value);
      this.dataStorageService.storeData('tasks');
      this.stepsService.goTo(this.profilesService.profileSelected.name, this.stepsService.previousStep);
    }
    
  }
  
}
