export interface Appointments {
  id?: number;
  patientIdentification: string;
  patientName: string;
  doctorName: string;
  motive: string;
  date: string;
  time: string;
  description: string;
  medication: string;
  precautions: string;
}
