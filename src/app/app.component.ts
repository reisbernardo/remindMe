import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StepsService } from './services/steps/steps.service';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remindMe';

  constructor(private stepsService: StepsService,
    private modalService: NgbModal) {
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
