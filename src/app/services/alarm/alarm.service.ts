import { Injectable, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { ProfilesService } from '../profiles/profiles.service';
import { IAlarm } from './alarm.interface';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task.model';
import { Profile } from '../profiles/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AlarmService implements OnInit {
  allAlarms: IAlarm[] = [];
  date: Date;
  id: any;

  constructor(
    private dataStorageService: DataStorageService,
    private profilesService: ProfilesService,
    private tasksService: TasksService,) { }

  ngOnInit(): void {

  }

  addAlarm(task: Task){
    this.allAlarms[this.profilesService.getProfileIndex()].tasks.push(task);
    console.log("this.allAlarms: ", this.allAlarms);
  }

  removeAlarm(task: Task){
    this.allAlarms[this.profilesService.getProfileIndex()].tasks = this.allAlarms[this.profilesService.getProfileIndex()].tasks.filter(el => el.taskName !== task.taskName);
  }

  editAlarm(task: Task){
    this.removeAlarm(this.tasksService.taskSelected);
    this.addAlarm(task);
  }

  addAlarmProfile(profile: Profile){
    this.allAlarms.push({profile: profile, tasks: []})
    console.log("this.allAlarms: ", this.allAlarms);
  }

  getAlarms(){
    this.allAlarms = [];
    let index = 0;
    this.profilesService.getProfiles().forEach(profile => {
      setTimeout(() => {
        this.profilesService.profileSelected = profile;
        this.dataStorageService.fetchData('tasks');
        setTimeout( () => { 
          let tasks = this.tasksService.getTasks();
          this.allAlarms.push({profile, tasks});
        }, 350);
      }, 250*index++)
    })
    console.log("this.allAlarms: ", this.allAlarms);
    this.id = setInterval(() => {
      this.checkAlarms();
    }, 1000);
  }

 
  checkAlarms(){
    this.allAlarms.forEach(profile => {
      profile.tasks.forEach(task => {
        this.date = new Date();
        let hour = this.date.getHours() + ':' + this.date.getMinutes();
        if(task.daysArray.includes(String(this.date.getDay())) && task.time == hour && this.date.getSeconds() < 1)
          console.log("Alarme de " + profile.profile.name + ' para ' + task.taskName + ' às ' + hour);
      })
    })
  }

  clearAlarm(){
    if(this.id) clearInterval(this.id);
  }

}
