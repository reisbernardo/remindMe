import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewProfileComponent } from './pages/new-profile/new-profile.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { DailyTasksComponent } from './pages/daily-tasks/daily-tasks.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { AlarmModalComponent } from './shared/alarm-modal/alarm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NewProfileComponent,
    NewTaskComponent,
    DailyTasksComponent,    
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertModalComponent,
    ConfirmationModalComponent,
    AlarmModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
