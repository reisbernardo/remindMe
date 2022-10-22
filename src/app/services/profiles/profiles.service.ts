import { Injectable } from '@angular/core';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private profiles: Profile[] = [];
  profileSelected: Profile;
  constructor() { }

  setProfiles(profiles: Profile[]){
    this.profiles = profiles;
  }

  getProfiles(){
    return this.profiles.slice();
  }

  addProfile(profile: Profile){
    this.profiles.push(profile);
  }

  getProfileIndex(){
    return this.profiles.findIndex(x => x.name == this.profileSelected.name);
  }
}
