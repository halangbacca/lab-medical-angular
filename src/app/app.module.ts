import { InterceptorService } from './components/interceptor.service';
import { PatientsService } from './components/patients.service';
import { LoginGuard } from './guard/login.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppointmentWorkflowComponent } from './components/appointment-workflow/appointment-workflow.component';
import { LoginComponent } from './components/login/login.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { AppointmentRegistrationComponent } from './components/appointment-registration/appointment-registration.component';
import { PatientWorkflowComponent } from './components/patient-workflow/patient-workflow.component';
import { CardsComponent } from './components/cards/cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgePipe } from './components/age.pipe';
import { PatientActionsComponent } from './components/patient-actions/patient-actions.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ExamsActionsComponent } from './components/exams-actions/exams-actions.component';
import { AppointmentsActionsComponent } from './components/appointments-actions/appointments-actions.component';
import { ExamsWorkflowComponent } from './components/exams-workflow/exams-workflow.component';
import { ConsultsWorkflowComponent } from './components/consults-workflow/consults-workflow.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AppointmentWorkflowComponent,
    LoginComponent,
    PatientRegistrationComponent,
    ExamRegistrationComponent,
    AppointmentRegistrationComponent,
    PatientWorkflowComponent,
    CardsComponent,
    AgePipe,
    PatientActionsComponent,
    CreateUserComponent,
    ForgotPasswordComponent,
    ExamsActionsComponent,
    AppointmentsActionsComponent,
    ExamsWorkflowComponent,
    ConsultsWorkflowComponent,
    FooterComponent,
    HomeComponent,
    SpinnerComponent,
    BackToTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    PatientsService,
    LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
