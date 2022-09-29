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
  @Input() task_selected: string;
  taskForm: FormGroup;
  tasks = ["Remédio", "Exercício", "Recreação"];
  constructor(
    private stepsService: StepsService,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private profilesService: ProfilesService) { }

  ngOnInit(): void {
    console.log(this.task_selected);
    this.taskForm = new FormGroup({
      'task': new FormControl(this.task_selected),
      'taskName': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'frequency': new FormControl(null, [Validators.required]),
  },);
  }

  onSubmit(){
    console.log(this.taskForm.value);
    this.tasksService.addTasks(this.taskForm.value);
    this.dataStorageService.storeData('tasks');
    this.stepsService.goTo(this.profilesService.profileSelected.name, this.stepsService.previousStep);
  }
  
}
