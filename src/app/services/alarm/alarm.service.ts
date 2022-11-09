import { Injectable, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { ProfilesService } from '../profiles/profiles.service';
import { IAlarm } from './alarm.interface';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task.model';
import { Profile } from '../profiles/profile.model';
import { ModalService } from '../modal/modal.service';
import { LoadingService } from '../loading/loading.service';

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
    private tasksService: TasksService,
    private modalService: ModalService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {

  }

  addAlarm(task: Task){
    this.allAlarms[this.profilesService.getProfileIndex()].tasks.push(task);
  }

  removeAlarm(task: Task){
    this.allAlarms[this.profilesService.getProfileIndex()].tasks = this.allAlarms[this.profilesService.getProfileIndex()].tasks.filter(el => el.taskName !== task.taskName);
  }

  editAlarm(task: Task){
    this.removeAlarm(this.tasksService.taskSelected);
    this.addAlarm(task);
  }

  addAlarmProfile(profile: Profile){
    this.allAlarms.push({profile: profile, tasks: []});
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
          this.loadingService.stopLoading();
        }, 1000);
      }, 1000*index++)
    });
    this.id = setInterval(() => {
      this.checkAlarms();
    }, 1000);
  }

 
  checkAlarms(){
    this.allAlarms.forEach(profile => {
      profile.tasks.forEach(task => {
        this.date = new Date();
        let minutes = this.date.getMinutes() > 9 ? this.date.getMinutes() : '0' + this.date.getMinutes();
        let hour = this.date.getHours() + ':' + minutes;
        if(task.daysArray.includes(String(this.date.getDay())) && task.time == hour && this.date.getSeconds() < 1){
          console.log("Alarme de " + profile.profile.name + ' para ' + task.taskName + ' às ' + hour);
          this.modalService.openModal('alert', "Alarme de " + profile.profile.name + ': ' + task.taskName + ' às ' + hour)
          .then(() => {return}).catch(() => {return});
        }
      })
    })
  }

  clearAlarm(){
    if(this.id) clearInterval(this.id);
  }

}
