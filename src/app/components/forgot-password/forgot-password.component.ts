import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PatientsService } from '../patients.service';
import { Users } from '../users';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  user: Users = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };

  loginUsers: Users[] = [];
  regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  newPassword = '';

  constructor(private service: PatientsService, private router: Router) {}

  ngOnInit(): void {
    this.service.listUsers().subscribe((users) => {
      this.loginUsers = users;
    });
  }

  validate(email: string): any {
    let existentUser = this.loginUsers.find((user) => user.email == email);
    if (existentUser) {
      this.newPassword = existentUser.password;
      return true;
    }
    return false;
  }

  recoverPassword() {
    if (this.user.name === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Digite o seu nome!',
      });
      return;
    }
    if (this.user.email === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Digite o seu e-mail!',
      });
      return;
    }
    if (!this.user.email.match(this.regexEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formato de e-mail inválido',
      });
      return;
    }
    if (this.validate(this.user.email)) {
      Swal.fire({
        icon: 'success',
        title: 'Bem-Vindo(a) de volta!',
        text: `A sua senha é ${this.newPassword}`,
      });
      this.router.navigate(['/']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'E-mail e/ou senha incorretos!',
      });
      return;
    }
  }
}
