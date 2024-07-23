import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutenticateService {
  autenticated = false;

  authUser() {
    this.autenticated = true;
    localStorage.setItem('autenticated', JSON.stringify(this.autenticated));
  }

  logoutUser() {
    this.autenticated = false;
    localStorage.setItem('autenticated', JSON.stringify(this.autenticated));
  }
}
