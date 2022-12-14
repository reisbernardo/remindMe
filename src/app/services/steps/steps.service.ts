import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfilesService } from '../profiles/profiles.service';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  previousStep: number;
  previousHeader: string;
  step = 0;
  header = "RemindMe";
  
  constructor(
    private authService: AuthService,
    private taskService: TasksService,
    private profilesService: ProfilesService) { }

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
      this.taskService.setTasks([]);
    } else if(this.step == 21){
      this.step = this.previousStep;  
      this.header = this.previousHeader;
    } else if(this.step == 3){
      this.previousStep = this.step;
      this.step = 2;
      this.header = this.profilesService.profileSelected.name;
    }
  }
}
