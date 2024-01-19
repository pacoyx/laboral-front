import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent {

  frmLogin: FormGroup;

  constructor(private router: Router, private loginService: LoginService) {
    this.frmLogin = new FormGroup({
      correo: new FormControl('',Validators.required),
      clave: new FormControl('',Validators.required)
    });

  }

  login() {
    const req = {
      correo: this.frmLogin.value.correo,
      clave: this.frmLogin.value.clave,
    };

    console.log('request::', req);

    this.loginService.login(req).subscribe({
      next: (resp) => {
        console.log(resp);
        // this.router.navigateByUrl('manager');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete loginService()');
      },
    });
  }
}
