import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/Services/auth-google.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-validate-login',
  templateUrl: './validate-login.component.html',
  styleUrls: ['./validate-login.component.scss'],
})
export class ValidateLoginComponent {
  private authGoogle = inject(AuthGoogleService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  constructor() {
    const data = this.authGoogle.getProfile();
    console.log('data==>', data);
    setTimeout(() => {
      const token = sessionStorage.getItem('id_token');
      console.log('token google==>', token);

      //validamos token contra el backend
      this.loginService.validaTokenGoogle({ token }).subscribe({
        next: (resp) => {
          console.log(resp);
          if(resp.codigoRespuesta != '00'){
            this.router.navigateByUrl('/home');
            return;
          } 

          const dataToken = {
            user: resp.data,
            token: resp.token,
            recordar: 0,
            tipo: 'google'
          };
          localStorage.setItem('laboral.ai', JSON.stringify(dataToken));
          localStorage.setItem(
            'laboral.ai.check',
            JSON.stringify({ correo: resp.data.correo_corporativo, clave: '' })
          );
          this.router.navigateByUrl('/manager');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete validaTokenGoogle()');
        },
      });
    }, 1500);
  }
}
