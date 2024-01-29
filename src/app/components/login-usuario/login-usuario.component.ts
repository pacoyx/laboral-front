import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IReqLogin } from 'src/app/interfaces/IreqLogin';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit {
  frmLogin: FormGroup;
  bol_err = false;
  msg_err = '';

  constructor(private router: Router, private loginService: LoginService) {
    this.frmLogin = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      recordar: new FormControl(false, Validators.required),
    });
  }

  ngOnInit(): void {
    this.cargarCorreoGuardado();
  }

  get correo() {
    return this.frmLogin.get('correo');
  }
  get clave() {
    return this.frmLogin.get('clave');
  }

  cargarCorreoGuardado() {
    let usuario: any = localStorage.getItem('laboral.ai.check');
    if (usuario == null) {
      return;
    }
    usuario = JSON.parse(usuario!);
    this.frmLogin.get('correo')?.setValue(usuario.correo);
    this.frmLogin.get('clave')?.setValue(usuario.clave);
    this.frmLogin.get('recordar')?.setValue(true);
  }

  login() {
    const req: IReqLogin = {
      correo: this.frmLogin.value.correo,
      clave: this.frmLogin.value.clave,
    };

    console.log('request::', req);

    this.loginService.login(req).subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.codigoRespuesta == '00') {
          const dataToken = {
            user: resp.data,
            token: resp.token,
            recordar: this.frmLogin.value.recordar ? 1 : 0,
          };
          localStorage.setItem('laboral.ai', JSON.stringify(dataToken));
          localStorage.setItem('laboral.ai.check', JSON.stringify(req));
          this.router.navigateByUrl('/manager/perfil');
        }
        this.bol_err = true;
        this.msg_err = 'Usuario o clave incorrectos';

        setTimeout(() => {
          this.bol_err = false;
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        this.bol_err = true;
        this.msg_err = 'Error en login';
      },
      complete: () => {
        console.log('complete login()');
      },
    });
  }
}
