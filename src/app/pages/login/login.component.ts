import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlarmService } from 'src/app/services/alarm/alarm.service';
import { AuthResponseData, AuthService } from 'src/app/services/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { StepsService } from 'src/app/services/steps/steps.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: UntypedFormGroup;
  isLogin = true;
  isLoading = false;
  error: string = null;

  constructor(
    private stepsService: StepsService,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private alarmService: AlarmService){}

  ngOnInit(): void {
      this.signupForm = new UntypedFormGroup({
          email: new UntypedFormControl(null, [Validators.required, Validators.email]),
          password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)])
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
    this.signupForm.reset()
    authObs.subscribe(() => {
      this.dataStorageService.fetchData('profiles');
      setTimeout( () => { 
        this.isLoading = false; 
        this.stepsService.goTo("RemindMe", 1);
        this.alarmService.getAlarms();
      }, 600 );
       
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
  }

  onChangeMode(){
    this.signupForm.reset();
    this.isLogin = !this.isLogin
  }

  onHandleError() {
    this.error = null;
  }
}
