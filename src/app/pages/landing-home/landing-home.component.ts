import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent {
  bol_login = true;
    
  constructor(private router:Router){

  }

  modoLogin() {
    this.bol_login = true;
  }

  modoRegistro() {
    this.bol_login = false;
  }

  login(){
    this.router.navigateByUrl('/manager');
  }

}
