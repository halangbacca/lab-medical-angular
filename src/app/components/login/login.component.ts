import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { Users } from '../users';
import Swal from 'sweetalert2';
import { AutenticateService } from '../autenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: Users = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };

  loginUsers: Users[] = [];
  regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private service: PatientsService,
    private router: Router,
    private authServer: AutenticateService
  ) {}

  ngOnInit(): void {
    let autenticated = localStorage.getItem('autenticated');
    if (autenticated === 'true') {
      this.router.navigate(['']);
    }

    this.service.listUsers().subscribe((users) => {
      return (this.loginUsers = users);
    });
  }

  validate(email: string, password: string): any {
    let existentUser = this.loginUsers.find(
      (user) => user.email == email && user.password == password
    );
    if (existentUser) {
      localStorage.setItem('user', JSON.stringify(existentUser.name));
      return true;
    }
    return false;
  }

  login() {
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
    if (this.user.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Digite a sua senha!',
      });
      return;
    }
    if (this.validate(this.user.email, this.user.password)) {
      Swal.fire({
        icon: 'success',
        title: 'Bem-Vindo(a)!',
        text: 'Entrada efetuada com sucesso!',
        timer: 2000,
        timerProgressBar: true,
      });
      this.authServer.authUser();
      localStorage.setItem(
        'session',
        JSON.stringify('Estatísticas e Informações')
      );
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
