import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/services/auth/auth.service';
import { StepsService } from 'src/app/services/steps/steps.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  isLogin = true;
  isLoading = false;
  error: string = null;

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
    this.error = null;
    this.isLoading = true;

    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    let authObs: Observable<AuthResponseData>;

    if(this.isLogin){
      authObs = this.authService.login(email, password);
    } else{
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });

    this.signupForm.reset();
/*     if(this.error) this.stepsService.goTo("RemindMe", 1); */
  }

  onChangeMode(){
    this.signupForm.reset();
    this.isLogin = !this.isLogin
  }
}
