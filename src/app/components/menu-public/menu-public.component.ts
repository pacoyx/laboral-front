import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-public',
  templateUrl: './menu-public.component.html',
  styleUrls: ['./menu-public.component.scss'],
})
export class MenuPublicComponent {
  bol_login = true;

  login() {
    this.bol_login = true;
  }

  registro() {
    this.bol_login = false;
  }
}
