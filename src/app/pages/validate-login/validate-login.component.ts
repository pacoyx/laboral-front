import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGoogleService } from 'src/app/Services/auth-google.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-validate-login',
  templateUrl: './validate-login.component.html',
  styleUrls: ['./validate-login.component.scss'],
})
export class ValidateLoginComponent implements OnInit, OnDestroy {
  private authGoogle = inject(AuthGoogleService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  linkedInToken = '';

  unsuscriptionGoogle!: Subscription;
  unsuscriptionLinkedin!: Subscription;

  constructor() {
    //  this.validarTokenGoogle();
  }
  ngOnDestroy(): void {
    if(this.unsuscriptionGoogle)this.unsuscriptionGoogle.unsubscribe();
    if(this.unsuscriptionLinkedin)this.unsuscriptionLinkedin.unsubscribe();
  }

  ngOnInit(): void {
    this.linkedInToken = this.route.snapshot.queryParams['code'];
    if (this.linkedInToken) {
      this.validarTokenLinkedin(this.linkedInToken);
    } else {
      this.validarTokenGoogle();
    }
  }
  
  validarTokenLinkedin(token: string) {
    this.unsuscriptionLinkedin =   this.loginService.validaTokenLinkedin({ token }).subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.codigoRespuesta != '00') {
          this.router.navigateByUrl('/home');
          return;
        }
        const dataToken = {
          user: resp.data,
          token: resp.token,
          recordar: 0,
          tipo: 'linkedin',
        };
        localStorage.setItem('laboral.ai', JSON.stringify(dataToken));
        localStorage.setItem('laboral.ai.check', JSON.stringify({ correo: resp.data.correo_corporativo, clave: '' }));
        this.router.navigateByUrl('/manager');
      },
      error: (resp) => {
        console.log(resp);
        this.router.navigateByUrl('/home');
      },
      complete: () => {
        console.log(console.log('complete validarTokenLinkedin()'));
      },
    });
  }

  validarTokenGoogle() {
    const data = this.authGoogle.getProfile();
    console.log('data google==>', data);
    setTimeout(() => {
      const token = sessionStorage.getItem('id_token');

      //validamos token contra el backend
      this.unsuscriptionGoogle = this.loginService.validaTokenGoogle({ token }).subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.codigoRespuesta != '00') {
            this.router.navigateByUrl('/home');
            return;
          }

          const dataToken = {
            user: resp.data,
            token: resp.token,
            recordar: 0,
            tipo: 'google',
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
          this.router.navigateByUrl('/home');
        },
        complete: () => {
          console.log('complete validaTokenGoogle()');
        },
      });
    }, 1500);
  }
}
