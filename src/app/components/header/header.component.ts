import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AutenticateService } from '../autenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  currentUser: any;

  session: any;
  currentSession: any;

  constructor(
    private router: Router,
    private authService: AutenticateService
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.user = localStorage.getItem('user');
    this.currentUser = JSON.parse(this.user);

    this.session = localStorage.getItem('session');
    this.currentSession = JSON.parse(this.session);
  }

  logout() {
    localStorage.clear();
    this.authService.logoutUser();
    Swal.fire({
      icon: 'success',
      title: 'Volte logo!',
      text: 'Logout efetuado com sucesso!',
      timer: 2000,
      timerProgressBar: true,
    });
    this.router.navigate(['/login']);
  }
}
