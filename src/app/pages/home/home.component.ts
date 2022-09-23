import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles/profiles.service';
import { StepsService } from 'src/app/services/steps.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private profilesService: ProfilesService,
    private stepsService: StepsService ) { }

  ngOnInit(): void {
  }
  
  getProfiles(){
    return this.profilesService.profiles;
  }

  onGoToProfile(profile: string){
    this.stepsService.goTo(profile, 2);
  }

  onGoToCreateProfile(){
    this.stepsService.goTo("Novo Perfil", 11);
  }
}
