import { Component } from '@angular/core';
import { StepsService } from './services/steps/steps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remindMe';

  constructor(private stepsService: StepsService) {}

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
