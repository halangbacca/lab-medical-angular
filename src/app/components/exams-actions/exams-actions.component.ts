import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Exams } from '../exams';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-exams-actions',
  templateUrl: './exams-actions.component.html',
  styleUrls: ['./exams-actions.component.css'],
})
export class ExamsActionsComponent {
  exam: Exams = {
    id: 0,
    patientIdentification: '',
    patientName: '',
    doctorName: '',
    name: '',
    date: '',
    time: '',
    type: '',
    lab: '',
    url: '',
    result: '',
  };

  constructor(
    private service: PatientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    localStorage.setItem('session', JSON.stringify('Edição de Exame'));

    const id = this.route.snapshot.paramMap.get('id');
    this.service.searchExamById(parseInt(id!)).subscribe((exam) => {
      this.exam = exam;
    });
  }

  cancel() {
    localStorage.setItem('session', JSON.stringify('Listagem de Exames'));
    this.router.navigate(['/listagem-de-exames']);
  }

  editExam() {
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

    let doctorName = localStorage.getItem('user');
    this.exam.doctorName = JSON.parse(doctorName!);
    
    this.service.editExams(this.exam).subscribe(() => {
      localStorage.setItem('session', JSON.stringify('Listagem de Exames'));
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Exame editado com sucesso!',
      });
      this.router.navigate(['/listagem-de-exames']);
    });
  }

  deleteExam() {
    this.service.deleteExam(this.exam.id!).subscribe(() => {
      localStorage.setItem('session', JSON.stringify('Listagem de Exames'));
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Exame deletado com sucesso!',
      });
      this.router.navigate(['/listagem-de-exames']);
    });
  }
}
