import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loggedUserData: any;
  logoff() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('trainUser');
      this.loggedUserData = undefined;
    }}
}
