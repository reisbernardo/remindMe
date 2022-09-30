import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  
  taskForm: FormGroup;
  tasks = ["Remédio", "Exercício", "Recreação"];
  constructor(
    private stepsService: StepsService,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private profilesService: ProfilesService) { }

  ngOnInit(): void {
    let taskSelected: string;
    let taskNameSelected: string;
    let taskFrequencySelected: number;
    if(this.stepsService.previousStep == 3){
      taskSelected = this.tasksService.taskSelected.task;
      taskNameSelected = this.tasksService.taskSelected.taskName;
      taskFrequencySelected = this.tasksService.taskSelected.frequency;
    }
    this.taskForm = new FormGroup({
      'task': new FormControl(taskSelected),
      'taskName': new FormControl(taskNameSelected, [Validators.required, Validators.maxLength(30)]),
      'frequency': new FormControl(taskFrequencySelected, [Validators.required]),
  },);
  }

  onSubmit(){
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
