import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfilesService } from '../profiles/profiles.service';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private profilesService: ProfilesService,
    private tasksService: TasksService,
    private authService: AuthService) { }

  storeData(data: string){
    let dataStore: any;
    if(data == 'profiles') dataStore = this.profilesService.getProfiles();
    else if (data == 'tasks') {
      dataStore = this.tasksService.getTasks()
      data += this.profilesService.getProfileIndex().toString();
    }
    
    this.http.put('https://remindme-66310-default-rtdb.firebaseio.com/' + this.authService.userId + '/' + data +'.json?auth=' + this.authService.token, dataStore);
  }

  fetchData(data: string){
    if (data == 'tasks') data += this.profilesService.getProfileIndex().toString();
    return this.http.get<any>('https://remindme-66310-default-rtdb.firebaseio.com/' + this.authService.userId + '/' + data +'.json?auth='  + this.authService.token)
    .subscribe(response => {
      if(response == null) response = [];
      if(data == 'profiles') {
        this.profilesService.setProfiles(response);
      }
      else {
        this.tasksService.setTasks(response);
      }
    })
  }
}
