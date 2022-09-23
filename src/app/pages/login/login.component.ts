import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepsService } from 'src/app/services/steps.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  isLogin = true;

  constructor(private stepsService: StepsService){}

  ngOnInit(): void {
      this.signupForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'password': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'confirm-password': new FormControl(null, [Validators.required, Validators.minLength(4)])
      },);
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.stepsService.goTo("RemindMe", 1);
  }

  onChangeMode(){
    this.isLogin = !this.isLogin
  }
}
