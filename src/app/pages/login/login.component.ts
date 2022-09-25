import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StepsService } from 'src/app/services/steps/steps.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  isLogin = true;

  constructor(
    private stepsService: StepsService,
    private authService: AuthService){}

  ngOnInit(): void {
      this.signupForm = new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      },);
  }

  onSubmit(){
    if(!this.signupForm.valid) return; 
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    if(this.isLogin){

    } else{
        this.authService.signUp(email, password).subscribe(resData => {
          console.log(resData);
        },
        error => {
          console.log(error);
        });
    }

    this.signupForm.reset();
    this.stepsService.goTo("RemindMe", 1);
  }

  onChangeMode(){
    this.signupForm.reset();
    this.isLogin = !this.isLogin
  }
}
