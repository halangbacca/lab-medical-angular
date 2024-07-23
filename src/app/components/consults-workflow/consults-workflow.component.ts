import { Appointments } from './../appointments';
import { Component, OnInit } from '@angular/core';
import { Patients } from '../patients';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-consults-workflow',
  templateUrl: './consults-workflow.component.html',
  styleUrls: ['./consults-workflow.component.css'],
})
export class ConsultsWorkflowComponent implements OnInit {
  patients: Patients[] = [];
  filteredPatients: Patients[] = [];

  appointments: Appointments[] = [];
  filteredAppointments: Appointments[] = [];

  constructor(private service: PatientsService) {}

  ngOnInit(): void {
    localStorage.setItem('session', JSON.stringify('Listagem de Consultas'));

    this.service.listPatients().subscribe((patient) => {
      this.patients = patient;
      this.filteredPatients = patient;
    });
    this.service.listAppointments().subscribe((appointment) => {
      this.appointments = appointment;
      this.filteredAppointments = appointment;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filteredAppointments = this.appointments.filter((data: any) => {
      return (
        data.patientIdentification.toLowerCase().includes(value) ||
        data.patientName.toLowerCase().includes(value) ||
        data.date.toLowerCase().includes(value) ||
        data.time.toLowerCase().includes(value)
      );
    });
  }
}
