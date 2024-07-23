import { CardsComponent } from './components/cards/cards.component';
import { ConsultsWorkflowComponent } from './components/consults-workflow/consults-workflow.component';
import { ExamsActionsComponent } from './components/exams-actions/exams-actions.component';
import { AppointmentsActionsComponent } from './components/appointments-actions/appointments-actions.component';
import { PatientActionsComponent } from './components/patient-actions/patient-actions.component';
import { PatientWorkflowComponent } from './components/patient-workflow/patient-workflow.component';
import { AppointmentWorkflowComponent } from './components/appointment-workflow/appointment-workflow.component';
import { AppointmentRegistrationComponent } from './components/appointment-registration/appointment-registration.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginGuard } from './guard/login.guard';
import { ExamsWorkflowComponent } from './components/exams-workflow/exams-workflow.component';

const routes: Routes = [
  {
    path: '',
    component: CardsComponent,
    canActivate: [LoginGuard],
  },

  { path: 'login', component: LoginComponent },

  { path: 'cadastro', component: CreateUserComponent },

  { path: 'recuperar-senha', component: ForgotPasswordComponent },

  {
    path: 'cadastro-de-paciente',
    component: PatientRegistrationComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'cadastro-de-exame',
    component: ExamRegistrationComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'cadastro-de-consulta',
    component: AppointmentRegistrationComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'listagem-de-prontuarios',
    component: AppointmentWorkflowComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'listagem-de-consultas',
    component: ConsultsWorkflowComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'listagem-de-exames',
    component: ExamsWorkflowComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'prontuario-do-paciente/:id',
    component: PatientWorkflowComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'editar-paciente/:id',
    component: PatientActionsComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'editar-exame/:id',
    component: ExamsActionsComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'editar-consulta/:id',
    component: AppointmentsActionsComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
