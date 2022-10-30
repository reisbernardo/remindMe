import { Injectable, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { ProfilesService } from '../profiles/profiles.service';
import { IAlarm } from './alarm.interface';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmService implements OnInit {
  allAlarms: IAlarm[] = [];

  constructor(
    private dataStorageService: DataStorageService,
    private profilesService: ProfilesService,
    private tasksService: TasksService) { }

  ngOnInit(): void {

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
        }, 200);
      }, 150*index)
      index += 1;
    })
    console.log("this.allAlarms: ", this.allAlarms);
  }

}
