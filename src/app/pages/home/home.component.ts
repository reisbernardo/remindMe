import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Profile } from 'src/app/services/profiles/profile.model';
import { ProfilesService } from 'src/app/services/profiles/profiles.service';
import { StepsService } from 'src/app/services/steps/steps.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  constructor(
    private profilesService: ProfilesService,
    private stepsService: StepsService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }
  
  getProfiles(){
    return this.profilesService.getProfiles();
  }

  onGoToProfile(profile: Profile){
    this.isLoading = true;
    this.profilesService.profileSelected = profile;
    this.dataStorageService.fetchData('tasks');
    setTimeout( () => { 
      this.isLoading = false; 
      this.stepsService.goTo(profile.name, 2);
    }, 400 );
  }

  onGoToCreateProfile(){
    this.stepsService.goTo("Novo Perfil", 11);
  }
}
