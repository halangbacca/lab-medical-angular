import { Exams } from './../exams';
import { Component, OnInit } from '@angular/core';
import { Patients } from '../patients';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-exams-workflow',
  templateUrl: './exams-workflow.component.html',
  styleUrls: ['./exams-workflow.component.css'],
})
export class ExamsWorkflowComponent implements OnInit {
  patients: Patients[] = [];
  filteredPatients: Patients[] = [];

  exams: Exams[] = [];
  filteredExams: Exams[] = [];

  constructor(private service: PatientsService) {}

  ngOnInit(): void {
    localStorage.setItem('session', JSON.stringify('Listagem de Exames'));

    this.service.listPatients().subscribe((patient) => {
      this.patients = patient;
      this.filteredPatients = patient;
    });
    this.service.listExams().subscribe((exam) => {
      this.exams = exam;
      this.filteredExams = exam;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filteredExams = this.exams.filter((data: any) => {
      return (
        data.patientIdentification.toLowerCase().includes(value) ||
        data.patientName.toLowerCase().includes(value) ||
        data.date.toLowerCase().includes(value) ||
        data.time.toLowerCase().includes(value)
      );
    });
  }
}
