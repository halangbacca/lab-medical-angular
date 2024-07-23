import { Component } from '@angular/core';
import { Patients } from '../patients';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-appointment-workflow',
  templateUrl: './appointment-workflow.component.html',
  styleUrls: ['./appointment-workflow.component.css'],
})
export class AppointmentWorkflowComponent {
  patients: Patients[] = [];
  filteredPatients: Patients[] = [];

  constructor(private service: PatientsService) {}

  ngOnInit(): void {
    localStorage.setItem('session', JSON.stringify('Listagem de Prontuários'));

    this.service.listPatients().subscribe((patient) => {
      this.patients = patient;
      this.filteredPatients = patient;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filteredPatients = this.patients.filter((data: any) => {
      return (
        data.identification.name.toLowerCase().includes(value) ||
        data.id == value
      );
    });
  }
}
