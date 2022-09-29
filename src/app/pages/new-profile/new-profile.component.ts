import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { ProfilesService } from 'src/app/services/profiles/profiles.service';
import { StepsService } from 'src/app/services/steps/steps.service';
import { Task } from 'src/app/services/tasks/task.model';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    private stepsService: StepsService,
    private profilesService: ProfilesService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'age': new FormControl(null, [Validators.maxLength(3), Validators.min(0)]),
  },);
  }

  onSubmit(){
    console.log(this.profileForm.value);
    this.profilesService.addProfile(this.profileForm.value);
    this.dataStorageService.storeData('profiles');
    this.stepsService.goTo("RemindMe", 1);
  }

}
