import { PatientsService } from './../patients.service';
import { Component, OnInit } from '@angular/core';
import { Patients } from '../patients';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  patients: Patients[] = [];
  filteredPatients: Patients[] = [];

  qtdExams: number = 0;
  qtdPatients: number = 0;
  qtdAppointments: number = 0;

  constructor(private service: PatientsService) {}

  ngOnInit(): void {
    this.service.listPatients().subscribe((patients) => {
      this.patients = patients;
      this.filteredPatients = patients;
      this.qtdPatients = patients.length;
    });
    this.service.listExams().subscribe((exams) => {
      this.qtdExams = exams.length;
    });
    this.service.listAppointments().subscribe((appointments) => {
      this.qtdAppointments = appointments.length;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filteredPatients = this.patients.filter((data) => {
      return (
        data.identification.name.toLowerCase().includes(value) ||
        data.identification.phone.toLowerCase().includes(value) ||
        data.identification.email.toLowerCase().includes(value)
      );
    });
  }
}
