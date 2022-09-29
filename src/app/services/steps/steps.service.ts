import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  previousStep: number;
  previousHeader: string;
  step = 0;
  header = "RemindMe";
  
  constructor(private authService: AuthService) { }

  goTo(h: string, s: number){
    this.previousStep = this.step;
    this.step = s;
    this.previousHeader = this.header;
    this.header = h;
  }

  goBack(){
    if(this.step == 1){
      this.step = 0;
      this.header = "RemindMe";
      this.authService.logout();
    } else if(this.step == 11 || this.step == 2){
      this.step = 1;
      this.header = "RemindMe";
    } else if(this.step == 21){
      this.step = this.previousStep;  
      this.header = this.previousHeader;
    } else if(this.step == 3){
      this.previousStep = this.step;
      this.step = 2;
      this.header = this.previousHeader;
    }
  }
}
