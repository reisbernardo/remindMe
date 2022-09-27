import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  previousStep: number;
  previousHeader: string;
  step = 0;
  header = "RemindMe";
  
  constructor() { }

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
    } else if(this.step == 11 || this.step == 2){
      this.step = 1;
      this.header = "RemindMe";
    } else if(this.step == 21 || this.step == 3){
      this.step = 2
      this.header = this.previousHeader;
    }
  }
}