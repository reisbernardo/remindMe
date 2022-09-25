import { Component, OnInit } from '@angular/core';
import { StepsService } from 'src/app/services/steps.service';
import { TaskService } from 'src/app/services/tasks/task/task.service';

@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.css']
})
export class DailyTasksComponent implements OnInit {

  constructor(
    private stepsService: StepsService,
    private taskService: TaskService) { }

  ngOnInit(): void {
  }

  getTarefas(){
    return this.taskService.tasks;
  }

  getHeader(){
    return this.stepsService.header;
  }

}
