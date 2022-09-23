import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  step = 11;
  header = "RemindMe";
  
  constructor() { }

  goTo(h: string, s: number){
    this.step = s;
    this.header = h;
  }
}
