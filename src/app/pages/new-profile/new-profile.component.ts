import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepsService } from 'src/app/services/steps.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private stepsService: StepsService) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'age': new FormControl(null, [Validators.maxLength(3), Validators.min(0)]),
  },);
  }

  onSubmit(){
    console.log(this.profileForm.value);
    this.stepsService.goTo("RemindMe", 1);
  }

}
