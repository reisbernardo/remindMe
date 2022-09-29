import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Profile } from '../profiles/profile.model';
import { ProfilesService } from '../profiles/profiles.service';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private profilesService: ProfilesService,
    private taskService: TasksService,
    private authService: AuthService) { }

  storeData(data: string){
    let dataStore: any;
    if(data == 'profiles') dataStore = this.profilesService.getProfiles();
    else if (data == 'tasks') {
      dataStore = this.taskService.getTasks()
      data += this.profilesService.getProfileIndex().toString();
      console.log('fetchData: ', data);
    }
    
    this.http.put('https://remindme-66310-default-rtdb.firebaseio.com/' + this.authService.userId + '/' + data +'.json?auth=' + this.authService.token, dataStore)
    .subscribe(response => {
      console.log('response: ', response);
    });
  }

  fetchData(data: string){
    if (data == 'tasks') data += this.profilesService.getProfileIndex().toString();
    console.log('fetchData: ', data);
    return this.http.get<any>('https://remindme-66310-default-rtdb.firebaseio.com/' + this.authService.userId + '/' + data +'.json?auth='  + this.authService.token)
    // .pipe(map(profiles => {
    //   return profiles.map(profile => {
    //     return {...profile, tasks: profile.tasks ? profile.tasks: []};
    //   });
    // })
    // // ,
    // // tap(profiles => {
    // //   this.profilesService.setProfiles(profiles);
    // // })
    // )
    .subscribe(response => {
      console.log('response: ', response);
      if(response == null) return;
      if(data == 'profiles') this.profilesService.setProfiles(response);
      else if (data == 'tasks') this.taskService.setTasks(response);
      
    })
  }
}
