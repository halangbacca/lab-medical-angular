import { Appointments } from './../appointments';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-appointments-actions',
  templateUrl: './appointments-actions.component.html',
  styleUrls: ['./appointments-actions.component.css'],
})
export class AppointmentsActionsComponent {
  appointment: Appointments = {
    id: 0,
    patientIdentification: '',
    patientName: '',
    doctorName: '',
    motive: '',
    date: '',
    time: '',
    description: '',
    medication: '',
    precautions: '',
  };

  constructor(
    private service: PatientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    localStorage.setItem('session', JSON.stringify('Edição de Consulta'));

    const id = this.route.snapshot.paramMap.get('id');
    this.service
      .searchAppointmentById(parseInt(id!))
      .subscribe((appointment) => {
        this.appointment = appointment;
      });
  }

  cancel() {
    localStorage.setItem('session', JSON.stringify('Listagem de Consulta'));
    this.router.navigate(['/listagem-de-consultas']);
  }

  editAppointment() {
    if (this.appointment.motive === '') {
      Swal.fire({
        icon: 'error',
        title: 'Motivo da consulta',
        text: 'Insira o motivo da consulta do paciente!',
      });
      return;
    }
    if (this.appointment.motive.length > 64) {
      Swal.fire({
        icon: 'error',
        title: 'Motivo da consulta',
        text: 'O número máximo de caracteres permitidos é 64!',
      });
      return;
    }
    if (this.appointment.motive.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Motivo da consulta',
        text: 'O número mínimo de caracteres permitidos é 8!',
      });
      return;
    }
    if (this.appointment.date === '') {
      Swal.fire({
        icon: 'error',
        title: 'Data da consulta',
        text: 'Insira a data da consulta do paciente!',
      });
      return;
    }
    if (this.appointment.time === '') {
      Swal.fire({
        icon: 'error',
        title: 'Horário da consulta',
        text: 'Insira o horário da consulta do paciente!',
      });
      return;
    }
    if (this.appointment.description === '') {
      Swal.fire({
        icon: 'error',
        title: 'Descrição do problema',
        text: 'Insira a descrição do problema do paciente!',
      });
      return;
    }
    if (this.appointment.description.length > 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Descrição do problema',
        text: 'O número máximo de caracteres permitidos é 1024!',
      });
      return;
    }
    if (this.appointment.description.length < 16) {
      Swal.fire({
        icon: 'error',
        title: 'Descrição do problema',
        text: 'O número mínimo de caracteres permitidos é 16!',
      });
      return;
    }
    if (this.appointment.precautions === '') {
      Swal.fire({
        icon: 'error',
        title: 'Dosagem e precauções',
        text: 'Insira a dosagem adequada e as precauções referentes ao medicamento receitado ao paciente!',
      });
      return;
    }
    if (this.appointment.precautions.length > 256) {
      Swal.fire({
        icon: 'error',
        title: 'Dosagem e precauções',
        text: 'O número máximo de caracteres permitidos é 256!',
      });
      return;
    }
    if (this.appointment.precautions.length < 16) {
      Swal.fire({
        icon: 'error',
        title: 'Dosagem e precauções',
        text: 'O número mínimo de caracteres permitidos é 16!',
      });
      return;
    }
    let doctorName = localStorage.getItem('user');
    this.appointment.doctorName = JSON.parse(doctorName!);
    
    this.service.editAppointment(this.appointment).subscribe(() => {
      localStorage.setItem('session', JSON.stringify('Listagem de Consultas'));
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Consulta editada com sucesso!',
      });
      this.router.navigate(['/listagem-de-consultas']);
    });
  }

  deleteAppointment() {
    this.service.deleteAppointment(this.appointment.id!).subscribe(() => {
      localStorage.setItem('session', JSON.stringify('Listagem de Consultas'));
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Consulta deletada com sucesso!',
      });
      this.router.navigate(['/listagem-de-consultas']);
    });
  }
}
