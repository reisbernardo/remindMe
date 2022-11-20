import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AlarmService } from 'src/app/services/alarm/alarm.service';
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
  taskForm: UntypedFormGroup;
  tasks = ["Remédio", "Exercício", "Recreação"];
  days = [
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
    private profilesService: ProfilesService,
    private fb: UntypedFormBuilder,
    private alarmService: AlarmService) {    
       }

  ngOnInit(): void {
    let taskSelected: string;
      let taskNameSelected: string;
      let taskTimeSelected: string;
      if(this.stepsService.previousStep == 3){
        taskSelected = this.tasksService.taskSelected.task;
        taskNameSelected = this.tasksService.taskSelected.taskName;
        taskTimeSelected = this.tasksService.taskSelected.time;
        this.buttonLabel = 'Alterar Tarefa';
      }
      this.taskForm = this.fb.group({
      task: this.fb.control(taskSelected, [Validators.required]),
      taskName: this.fb.control(taskNameSelected, [Validators.required, , Validators.maxLength(18)]),
      daysArray: this.fb.array([], [Validators.required]),
      time:  this.fb.control(taskTimeSelected, [Validators.required])
    })
  }

  onSubmit(){
    if(this.stepsService.previousStep == 3) {
      this.tasksService.editTasks(this.taskForm.value);
      this.alarmService.editAlarm(this.taskForm.value);
      this.dataStorageService.storeData('tasks');
      this.stepsService.goBack();
    }
    else {
      this.tasksService.addTasks(this.taskForm.value);
      this.alarmService.addAlarm(this.taskForm.value);
      this.dataStorageService.storeData('tasks');
      this.stepsService.goTo(this.profilesService.profileSelected.name, this.stepsService.previousStep);
    }
  }

  onCheckboxChange(e: any) {
    const daysArray: UntypedFormArray = this.taskForm.get('daysArray') as UntypedFormArray;
    if (e.target.checked) {
      daysArray.push(new UntypedFormControl(e.target.value));
    } else {
      let i: number = 0;
      daysArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value == e.target.value) {
          daysArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  
}
