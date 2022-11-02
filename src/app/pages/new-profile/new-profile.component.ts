import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AlarmService } from 'src/app/services/alarm/alarm.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { ProfilesService } from 'src/app/services/profiles/profiles.service';
import { StepsService } from 'src/app/services/steps/steps.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  profileForm: UntypedFormGroup;
  constructor(
    private stepsService: StepsService,
    private profilesService: ProfilesService,
    private dataStorageService: DataStorageService,
    private alarmService: AlarmService) { }

  ngOnInit(): void {
    this.profileForm = new UntypedFormGroup({
      'name': new UntypedFormControl(null, [Validators.required, Validators.maxLength(30)]),
      'age': new UntypedFormControl(null, [Validators.maxLength(3), Validators.min(0), Validators.pattern("^[0-9]*$")]),
  },);
  }

  onSubmit(){
    this.profilesService.addProfile(this.profileForm.value);
    this.alarmService.addAlarmProfile(this.profileForm.value);
    this.dataStorageService.storeData('profiles');
    this.stepsService.goTo("RemindMe", 1);
  }

}
