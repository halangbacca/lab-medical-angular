import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AutenticateService } from '../autenticate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  user: any;
  userObj: any;
  currentSession = [
    'Estatísticas e Informações',
    'Cadastro de Paciente',
    'Edição de Paciente',
    'Cadastro de Consulta',
    'Cadastro de Exame',
    'Listagem de Prontuários',
    'Prontuário do Paciente',
    'Listagem de Exames',
    'Listagem de Consultas',
  ];

  constructor(private router: Router, private authServer: AutenticateService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.userObj = JSON.parse(this.user);
  }

  home() {
    localStorage.setItem('session', JSON.stringify(this.currentSession[0]));
    this.router.navigate(['/']);
  }

  examRegistration() {
    localStorage.setItem('session', JSON.stringify(this.currentSession[4]));
    this.router.navigate(['/cadastro-de-exame']);
  }

  listExams() {
    localStorage.setItem('session', JSON.stringify(this.currentSession[7]));
    this.router.navigate(['/listagem-de-exames']);
  }

  patientRegistration() {
    localStorage.setItem('session', JSON.stringify(this.currentSession[1]));
    this.router.navigate(['/cadastro-de-paciente']);
  }

  createAppointment() {
    localStorage.setItem('session', JSON.stringify(this.currentSession[3]));
    this.router.navigate(['/cadastro-de-consulta']);
  }

  listAppointments() {
    localStorage.setItem('session', JSON.stringify(this.currentSession[8]));
    this.router.navigate(['/listagem-de-consultas']);
  }

  appointmentWorkflow() {
    localStorage.setItem('session', JSON.stringify(this.currentSession[5]));
    this.router.navigate(['/listagem-de-prontuarios']);
  }

  logout() {
    localStorage.clear();
    this.authServer.logoutUser();
    Swal.fire({
      icon: 'success',
      title: 'Volte logo!',
      text: 'Logout efetuado com sucesso!',
      timer: 2000,
      timerProgressBar: true,
    });
    this.router.navigate(['/login']);
  }
}
