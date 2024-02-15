import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IReqLogin } from 'src/app/interfaces/IreqLogin';
import { AuthGoogleService } from 'src/app/Services/auth-google.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit,OnDestroy {
  frmLogin: FormGroup;
  bol_err = false;
  msg_err = '';
  bol_loading=false;
  suscriptionLogin!:Subscription;

  linkedInCredentials: any = {
    clientId: environment.linkedinClientId,
    redirectUrl: environment.linkedinRedirectUrl,
    scope: "profile%20email%20openid" // To read basic user profile data and email
  };

  constructor(private router: Router, private loginService: LoginService, private authGoogleService:AuthGoogleService) {
    this.frmLogin = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      recordar: new FormControl(false, Validators.required),
    });
  }
  ngOnDestroy(): void {
    if(this.suscriptionLogin)this.suscriptionLogin.unsubscribe();
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

    this.bol_loading = true;
    this.suscriptionLogin = this.loginService.login(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.bol_loading = false;
        if (resp.codigoRespuesta == '00') {
          const dataToken = {
            user: resp.data,
            token: resp.token,
            recordar: this.frmLogin.value.recordar ? 1 : 0,
            tipo: 'sistema'
          };
          localStorage.setItem('laboral.ai', JSON.stringify(dataToken));
          localStorage.setItem('laboral.ai.check', JSON.stringify(req));
          this.router.navigateByUrl('/manager');
          return;
        }
        this.bol_err = true;
        this.msg_err = 'Usuario o clave incorrectos';

        setTimeout(() => {
          this.bol_err = false;
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        this.bol_loading = false;
        this.bol_err = true;
        this.msg_err = 'Error en login';
        setTimeout(() => {
          this.bol_err = false;
        }, 3000);
      },
      complete: () => {
        console.log('complete login()');
      },
    });
  }

  loginGoogle(){
    this.authGoogleService.login();
  }

  loginLinkedin(){
    window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&state=12ZpTvGc2chql4U&client_id=${
      this.linkedInCredentials.clientId
    }&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=${this.linkedInCredentials.scope}`;
  }
}
