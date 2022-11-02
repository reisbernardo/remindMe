import { Component } from '@angular/core';
import { ModalService } from './services/modal/modal.service';
import { StepsService } from './services/steps/steps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remindMe';

  constructor(private stepsService: StepsService,
    private modalService: ModalService) { 
  }

  getStep(){
    return this.stepsService.step;
  }

  getHeader(){
    return this.stepsService.header;
  }

  goBack(){
    if(this.stepsService.step == 11 || this.stepsService.step == 21)
    this.modalService.openModal('confirmation', 'Você realmente deseja voltar e perder suas informações?', 'Continuar', 'Voltar')
    .then((confirmed) => {
      if(!confirmed) this.stepsService.goBack();
    }).catch(() => {return});
    else this.stepsService.goBack();
  }
}
