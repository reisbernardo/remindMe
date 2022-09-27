import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepsService } from 'src/app/services/steps/steps.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  @Input() task_selected: string;
  taskForm: FormGroup;
  tasks = ["Remédio", "Exercício", "Recreação"];
  constructor(private stepsService: StepsService) { }

  ngOnInit(): void {
    console.log(this.task_selected);
    this.taskForm = new FormGroup({
      'task': new FormControl(this.task_selected),
      'task-name': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'frequency': new FormControl(null, [Validators.required]),
  },);
  }

  onSubmit(){
    console.log(this.taskForm.value);
    this.stepsService.goTo(this.stepsService.previousHeader, this.stepsService.previousStep);
  }
  
}
