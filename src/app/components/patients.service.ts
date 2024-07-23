import { Appointments } from './appointments';
import { Exams } from './exams';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patients } from './patients';
import { Observable } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private readonly patientsUrl = 'http://localhost:3000/patients';
  private readonly usersUrl = 'http://localhost:3000/users';
  private readonly examsUrl = 'http://localhost:3000/exams';
  private readonly appointmentsUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  // Lista os dados do JSON Server
  listUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.usersUrl);
  }

  listPatients(): Observable<Patients[]> {
    return this.http.get<Patients[]>(this.patientsUrl);
  }

  listExams(): Observable<Exams[]> {
    return this.http.get<Exams[]>(this.examsUrl);
  }

  listAppointments(): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(this.appointmentsUrl);
  }

  // Search
  searchPatientById(id: number): Observable<Patients> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.get<Patients>(url);
  }

  searchExamById(id: number): Observable<Exams> {
    const url = `${this.examsUrl}/${id}`;
    return this.http.get<Exams>(url);
  }

  searchAppointmentById(id: number): Observable<Appointments> {
    const url = `${this.appointmentsUrl}/${id}`;
    return this.http.get<Appointments>(url);
  }

  // Criação de dados
  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.usersUrl, user);
  }

  createPatient(patient: Patients): Observable<Patients> {
    return this.http.post<Patients>(this.patientsUrl, patient);
  }

  createExam(exam: Exams): Observable<Exams> {
    return this.http.post<Exams>(this.examsUrl, exam);
  }

  createAppointment(appointment: Appointments): Observable<Appointments> {
    return this.http.post<Appointments>(this.appointmentsUrl, appointment);
  }

  // Deleção dos dados
  deletePatient(id: number): Observable<Patients> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.delete<Patients>(url);
  }

  deleteExam(id: number): Observable<Exams> {
    const url = `${this.examsUrl}/${id}`;
    return this.http.delete<Exams>(url);
  }

  deleteAppointment(id: number): Observable<Appointments> {
    const url = `${this.appointmentsUrl}/${id}`;
    return this.http.delete<Appointments>(url);
  }

  // Edição dos dados
  editPatient(patient: Patients): Observable<Patients> {
    const url = `${this.patientsUrl}/${patient.id}`;
    return this.http.put<Patients>(url, patient);
  }

  editExams(exam: Exams): Observable<Exams> {
    const url = `${this.examsUrl}/${exam.id}`;
    return this.http.put<Exams>(url, exam);
  }

  editAppointment(appointment: Appointments): Observable<Appointments> {
    const url = `${this.appointmentsUrl}/${appointment.id}`;
    return this.http.put<Appointments>(url, appointment);
  }
}
