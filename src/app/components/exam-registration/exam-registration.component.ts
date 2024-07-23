import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PatientsService } from '../patients.service';
import { formatDate } from '@angular/common';
import { Exams } from '../exams';
import { Patients } from '../patients';

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
  styleUrls: ['./exam-registration.component.css'],
})
export class ExamRegistrationComponent implements OnInit {
  listPatients: Patients[] = [];
  filteredPatients: Patients[] = [];
  isSearch: boolean = false;

  patient: Patients = {
    identification: {
      name: '',
      gender: '',
      birth: '',
      cpf: '',
      rg: '',
      relationship: '',
      phone: '',
      email: '',
      nationality: '',
      allergy: '',
      care: '',
      emergencyContact: '',
    },
    insurance: {
      name: '',
      number: '',
      validity: '',
    },
    address: {
      cep: '',
      city: '',
      state: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      reference: '',
    },
  };

  exam: Exams = {
    id: 0,
    patientIdentification: '',
    patientName: '',
    doctorName: '',
    name: '',
    date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    time: formatDate(new Date(), 'H:mm:ss', 'en'),
    type: '',
    lab: '',
    url: '',
    result: '',
  };

  constructor(private service: PatientsService, private router: Router) {}

  ngOnInit(): void {
    this.service.listPatients().subscribe((patients) => {
      this.listPatients = patients;
      this.filteredPatients = patients;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.isSearch = true;

    this.filteredPatients = this.listPatients.filter((data: any) => {
      return (
        data.identification.name.toLowerCase().includes(value) ||
        data.identification.phone.toLowerCase().includes(value) ||
        data.identification.email.toLowerCase().includes(value)
      );
    });
    this.filteredPatients.forEach((value) => (this.patient = value));
  }

  createExam() {
    if(this.listPatients.length <= 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Cadastre um paciente',
        text: 'Não há nenhum paciente cadastrado!',
      });
      return;
    }
    if (!this.isSearch) {
      Swal.fire({
        icon: 'error',
        title: 'Pesquise um paciente',
        text: 'Você deve primeiro pesquisar um paciente!',
      });
      return;
    }
    if (this.exam.name === '') {
      Swal.fire({
        icon: 'error',
        title: 'Nome do exame',
        text: 'Insira o nome do exame a ser realizado!',
      });
      return;
    }
    if (this.exam.name.length > 64) {
      Swal.fire({
        icon: 'error',
        title: 'Nome do exame',
        text: 'O número máximo de caracteres permitidos é 64!',
      });
      return;
    }
    if (this.exam.name.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Nome do exame',
        text: 'O número mínimo de caracteres permitidos é 8!',
      });
      return;
    }
    if (this.exam.date === '') {
      Swal.fire({
        icon: 'error',
        title: 'Data do exame',
        text: 'Insira a data do exame a ser realizado!',
      });
      return;
    }
    if (this.exam.time === '') {
      Swal.fire({
        icon: 'error',
        title: 'Horário do exame',
        text: 'Insira o horário do exame a ser realizado!',
      });
      return;
    }
    if (this.exam.type === '') {
      Swal.fire({
        icon: 'error',
        title: 'Tipo de exame',
        text: 'Insira o tipo de exame a ser realizado!',
      });
      return;
    }
    if (this.exam.type.length > 32) {
      Swal.fire({
        icon: 'error',
        title: 'Tipo de exame',
        text: 'O número máximo de caracteres permitidos é 32!',
      });
      return;
    }
    if (this.exam.type.length < 4) {
      Swal.fire({
        icon: 'error',
        title: 'Tipo de exame',
        text: 'O número mínimo de caracteres permitidos é 4!',
      });
      return;
    }
    if (this.exam.lab === '') {
      Swal.fire({
        icon: 'error',
        title: 'Laboratório',
        text: 'Insira o nome do laboratório em que o exame será realizado!',
      });
      return;
    }
    if (this.exam.lab.length > 32) {
      Swal.fire({
        icon: 'error',
        title: 'Laboratório',
        text: 'O número máximo de caracteres permitidos é 32!',
      });
      return;
    }
    if (this.exam.lab.length < 4) {
      Swal.fire({
        icon: 'error',
        title: 'Laboratório',
        text: 'O número mínimo de caracteres permitidos é 4!',
      });
      return;
    }
    if (this.exam.result === '') {
      Swal.fire({
        icon: 'error',
        title: 'Resultados',
        text: 'Insira os resultados do exame!',
      });
      return;
    }
    if (this.exam.result.length > 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Resultados',
        text: 'O número máximo de caracteres permitidos é 1024!',
      });
      return;
    }
    if (this.exam.result.length < 16) {
      Swal.fire({
        icon: 'error',
        title: 'Resultados',
        text: 'O número mínimo de caracteres permitidos é 16!',
      });
      return;
    }
    this.exam.patientIdentification = this.patient.identification.cpf;
    this.exam.patientName = this.patient.identification.name;

    let doctorName = localStorage.getItem('user');
    this.exam.doctorName = JSON.parse(doctorName!);

    this.service.createExam(this.exam).subscribe(() => {
      localStorage.setItem(
        'session',
        JSON.stringify('Listagem de Prontuários')
      );
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Exame cadastrado com sucesso!',
      });
      this.router.navigate(['/listagem-de-prontuarios']);
    });
  }

  cancel() {
    localStorage.setItem(
      'session',
      JSON.stringify('Estatísticas e Informações')
    );
    this.router.navigate(['/']);
  }
}
