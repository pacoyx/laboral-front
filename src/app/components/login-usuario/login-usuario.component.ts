import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent {

  constructor(private router:Router){

  }

login(){
  this.router.navigateByUrl('manager');
}

}
