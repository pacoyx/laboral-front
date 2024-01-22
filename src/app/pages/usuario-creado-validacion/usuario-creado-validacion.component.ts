import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-usuario-creado-validacion',
  templateUrl: './usuario-creado-validacion.component.html',
  styleUrls: ['./usuario-creado-validacion.component.scss'],
})
export class UsuarioCreadoValidacionComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private loginService = inject(LoginService);

  bol_loading = false;
  bol_valOk = false;

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    console.log('token ===>', token);

    const xtoken = token.split('|');
    const objUser = {
      iv: xtoken[0],
      encryptedData: xtoken[1],
    };

    console.log(objUser);

    this.bol_loading = true;
    this.loginService.validarRegistroUsuario(objUser).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.bol_loading = false;
        if (resp.codigoRespuesta == '00') {
          this.bol_valOk = true;
        } else {
          this.bol_valOk = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.bol_loading = false;
        this.bol_valOk = false;
      },
      complete: () => {
        console.log('validarRegistroUsuario()');
      },
    });
  }
}
