import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  autenticated = false;
  title = 'labmedical';

  constructor() {}

  ngOnInit() {}

  ngDoCheck() {
    let autenticated = localStorage.getItem('autenticated');
    if (autenticated === 'true') {
      this.autenticated = true;
    } else {
      this.autenticated = false;
    }
  }
}
