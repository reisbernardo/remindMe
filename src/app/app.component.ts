import { Component } from '@angular/core';
import { StepsService } from './services/steps/steps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remindMe';

  constructor(private stepsService: StepsService) {
    let date: Date = new Date();  
    console.log("day: ", date.getDay())
    console.log("hours: ", date.getHours())
    console.log("minutes: ", date.getMinutes())
  }

  getStep(){
    return this.stepsService.step;
  }

  getHeader(){
    return this.stepsService.header;
  }

  goBack(){
    this.stepsService.goBack();
  }
}
