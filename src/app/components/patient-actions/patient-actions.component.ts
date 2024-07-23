import { Appointments } from './../appointments';
import { Exams } from './../exams';
import { CepService } from './../cep.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Patients } from '../patients';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patient-actions',
  templateUrl: './patient-actions.component.html',
  styleUrls: ['./patient-actions.component.css'],
})
export class PatientActionsComponent {
  regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

  regexPhone =
    /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

  regexCPF = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;

  regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  exams: Exams[] = [];
  filteredExams: Exams[] = [];

  appointments: Appointments[] = [];
  filteredAppointments: Appointments[] = [];

  patient: Patients = {
    id: 0,
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

  constructor(
    private service: PatientsService,
    private router: Router,
    private route: ActivatedRoute,
    private cep: CepService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('session', JSON.stringify('Edição de Paciente'));

    const id = this.route.snapshot.paramMap.get('id');
    this.service.searchPatientById(parseInt(id!)).subscribe((patient) => {
      this.patient = patient;
    });

    this.service.listExams().subscribe((exam) => {
      this.exams = exam;
    });

    this.service.listAppointments().subscribe((appoointment) => {
      this.appointments = appoointment;
    });
  }

  consultCep(value: any) {
    this.cep.search(value).subscribe((data) => this.populateForm(data));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return filterValue;
  }

  populateForm(data: any) {
    (this.patient.address.cep = data.cep),
      (this.patient.address.street = data.logradouro),
      (this.patient.address.neighborhood = data.bairro),
      (this.patient.address.city = data.localidade),
      (this.patient.address.state = data.uf);
  }

  cancel() {
    localStorage.setItem('session', JSON.stringify('Listagem de Prontuários'));
    this.router.navigate(['/listagem-de-prontuarios']);
  }

  cannotDelete() {
    this.filteredExams = this.exams.filter((value) => {
      return (
        value.patientIdentification
          .toLowerCase()
          .includes(this.patient.identification.cpf.toLowerCase()) &&
        value.patientName
          .toLowerCase()
          .includes(this.patient.identification.name.toLowerCase())
      );
    });

    this.filteredAppointments = this.appointments.filter((value) => {
      return (
        value.patientIdentification
          .toLowerCase()
          .includes(this.patient.identification.cpf.toLowerCase()) &&
        value.patientName
          .toLowerCase()
          .includes(this.patient.identification.name.toLowerCase())
      );
    });
  }

  editPatient() {
    if (this.patient.identification.name === '') {
      Swal.fire({
        icon: 'error',
        title: 'Nome',
        text: 'Digite o nome completo do paciente!',
      });
      return;
    }
    if (this.patient.identification.name.length > 64) {
      Swal.fire({
        icon: 'error',
        title: 'Nome',
        text: 'O número máximo de caracteres permitidos é 64!',
      });
      return;
    }
    if (this.patient.identification.name.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Nome',
        text: 'O número mínimo de caracteres permitidos é 8!',
      });
      return;
    }
    if (this.patient.identification.gender === '') {
      Swal.fire({
        icon: 'error',
        title: 'Gênero',
        text: 'Insira o gênero do paciente!',
      });
      return;
    }
    if (this.patient.identification.birth === '') {
      Swal.fire({
        icon: 'error',
        title: 'Data de Nascimento',
        text: 'Insira a data de nascimento do paciente!',
      });
      return;
    }
    if (!this.patient.identification.birth.match(this.regexDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Data de nascimento',
        text: 'Formato de data inválido!',
      });
      return;
    }
    if (this.patient.identification.cpf === '') {
      Swal.fire({
        icon: 'error',
        title: 'CPF',
        text: 'Insira o número do CPF do paciente!',
      });
      return;
    }
    if (!this.patient.identification.cpf.match(this.regexCPF)) {
      Swal.fire({
        icon: 'error',
        title: 'CPF',
        text: 'Número de CPF inválido!',
      });
      return;
    }
    if (this.patient.identification.rg === '') {
      Swal.fire({
        icon: 'error',
        title: 'Identidade',
        text: 'Insira o número da identidade do paciente!',
      });
      return;
    }
    if (this.patient.identification.rg.length > 20) {
      Swal.fire({
        icon: 'error',
        title: 'Identidade',
        text: 'O número máximo de caracteres permitidos é 20!',
      });
      return;
    }
    if (this.patient.identification.relationship === '') {
      Swal.fire({
        icon: 'error',
        title: 'Estado civil',
        text: 'Insira o estado civil do paciente!',
      });
      return;
    }
    if (this.patient.identification.phone === '') {
      Swal.fire({
        icon: 'error',
        title: 'Telefone',
        text: 'Insira o telefone do paciente!',
      });
      return;
    }
    if (!this.patient.identification.phone.match(this.regexPhone)) {
      Swal.fire({
        icon: 'error',
        title: 'Telefone',
        text: 'Número de telefone inválido!',
      });
      return;
    }
    if (this.patient.identification.email !== '') {
      if (!this.patient.identification.email.match(this.regexEmail)) {
        Swal.fire({
          icon: 'error',
          title: 'E-mail',
          text: 'Endereço de e-mail inválido',
        });
        return;
      }
    }
    if (this.patient.identification.nationality === '') {
      Swal.fire({
        icon: 'error',
        title: 'Naturalidade',
        text: 'Insira a naturalidade do paciente!',
      });
      return;
    }
    if (this.patient.identification.nationality.length > 64) {
      Swal.fire({
        icon: 'error',
        title: 'Naturalidade',
        text: 'O número máximo de caracteres permitidos é 64!',
      });
      return;
    }
    if (this.patient.identification.nationality.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Naturalidade',
        text: 'O número mínimo de caracteres permitidos é 8!',
      });
      return;
    }
    if (this.patient.identification.emergencyContact === '') {
      Swal.fire({
        icon: 'error',
        title: 'Contato de emergência',
        text: 'Insira o contato de emergência do paciente!',
      });
      return;
    }
    if (!this.patient.identification.emergencyContact.match(this.regexPhone)) {
      Swal.fire({
        icon: 'error',
        title: 'Contato de emergência',
        text: 'Número de telefone inválido!',
      });
      return;
    }
    if (this.patient.address.cep === '') {
      Swal.fire({
        icon: 'error',
        title: 'CEP',
        text: 'Insira o CEP do paciente!',
      });
      return;
    }
    if (this.patient.address.city === '') {
      Swal.fire({
        icon: 'error',
        title: 'Cidade',
        text: 'Insira o nome da cidade do paciente!',
      });
      return;
    }
    if (this.patient.address.state === '') {
      Swal.fire({
        icon: 'error',
        title: 'Estado',
        text: 'Insira o estado de residência do paciente!',
      });
      return;
    }
    if (this.patient.address.street === '') {
      Swal.fire({
        icon: 'error',
        title: 'Logradouro',
        text: 'Insira o nome da rua do paciente!',
      });
      return;
    }
    if (this.patient.address.number === '') {
      Swal.fire({
        icon: 'error',
        title: 'Número da casa',
        text: 'Insira o número da casa do paciente!',
      });
      return;
    }
    if (this.patient.address.neighborhood === '') {
      Swal.fire({
        icon: 'error',
        title: 'Bairro',
        text: 'Insira o nome do bairro do paciente!',
      });
      return;
    }

    this.service.editPatient(this.patient).subscribe(() => {
      localStorage.setItem('session', JSON.stringify('Estatísticas e Informações'));
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Paciente editado com sucesso!',
      });
      this.router.navigate(['/']);
    });
  }

  deletePatient() {
    this.cannotDelete();
    if (this.patient.id) {
      if (
        this.filteredExams.length <= 0 &&
        this.filteredAppointments.length <= 0
      ) {
        this.service.deletePatient(this.patient.id).subscribe(() => {
          localStorage.setItem(
            'session',
            JSON.stringify('Estatísticas e Informações')
          );
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: 'Paciente deletado com sucesso!',
          });
          this.router.navigate(['/']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'O(a) paciente possui exames e/ou consultas cadastrados(as) e não pode ser excluído(a)!',
        });
      }
    }
  }
}
