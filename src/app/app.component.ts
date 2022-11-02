import { Component } from '@angular/core';
import { StepsService } from './services/steps/steps.service';
import { ConfirmationService } from './shared/confirmation/confirmation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remindMe';

  constructor(private stepsService: StepsService,
    private confirmationService: ConfirmationService) {
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
    if(this.stepsService.step == 11 || this.stepsService.step == 21)
    this.confirmationService.confirm('Você realmente deseja voltar e perder suas informações?', 'Continuar', 'Voltar')
    .then((confirmed) => {
      if(!confirmed) this.stepsService.goBack();
    });
    else this.stepsService.goBack();
  }
}
