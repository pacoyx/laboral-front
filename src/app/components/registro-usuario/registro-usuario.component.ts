import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { IReqRegUsuario } from 'src/app/interfaces/IReqRegUsuario';
import { Subscription, map } from 'rxjs';
import { IReqExisteLogin } from 'src/app/interfaces/IReqExisteLogin';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent implements OnDestroy {
  frmRegUsuario: FormGroup;
  bol_err = false;
  msg_err = '';
  bol_loading = false;
  suscriptionRegister!: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.frmRegUsuario = this.fb.group({
      nombreCompleto: ['', { validators: [Validators.required] }],
      nombreEmpresa: ['', { validators: [Validators.required] }],
      correo: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [this.validarEmail.bind(this)],
          updateOn: 'blur',
        },
      ],
      celular: [''],
      clave: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      recordar: [0],
    });
  }

  ngOnDestroy(): void {
    if (this.suscriptionRegister) this.suscriptionRegister.unsubscribe();
  }

  validarEmail(control: AbstractControl) {
    console.log('entro al checkmail');
    const reqCheck: IReqExisteLogin = {
      correo: control.value,
    };
    return this.loginService.checkLogin(reqCheck).pipe(
      map((res) => {
        console.log(res);

        return res.existe == 'NO' ? null : { emailTaken: true };
      })
    );
  }

  get nombreCompleto() {
    return this.frmRegUsuario.get('nombreCompleto');
  }
  get nombreEmpresa() {
    return this.frmRegUsuario.get('nombreEmpresa');
  }
  get correo() {
    return this.frmRegUsuario.get('correo');
  }
  get celular() {
    return this.frmRegUsuario.get('celular');
  }
  get clave() {
    return this.frmRegUsuario.get('clave');
  }

  RegistrarUsuario() {
    if (this.frmRegUsuario.invalid) {
      this.bol_err = true;
      this.msg_err = 'Ingrese correctamente los datos';

      setTimeout(() => {
        this.bol_err = false;
      }, 3000);
      return;
    }

    const req: IReqRegUsuario = {
      correo: this.frmRegUsuario.value.correo,
      clave: this.frmRegUsuario.value.clave,
      nombreCompleto: this.frmRegUsuario.value.nombreCompleto,
      nombreEmpresa: this.frmRegUsuario.value.nombreCompleto,
      celular: this.frmRegUsuario.value.celular,
      estado: 2,
      icono: '',
      typeLogin: 'sistema',
    };

    this.bol_loading = true;
    this.suscriptionRegister = this.loginService
      .registrarUsuario(req)
      .subscribe({
        next: (resp) => {
          this.bol_loading = false;
          console.log(resp);
          if (resp.codigoRespuesta != '00') {
            this.bol_err = true;
            this.msg_err = 'Usuario o clave incorrectos';

            setTimeout(() => {
              this.bol_err = false;
            }, 3000);

            return;
          }

          //navegamos a pagina de usuario creado mensaje
          this.router.navigateByUrl('register');
        },
        error: (err) => {
          this.bol_loading = false;
          console.log(err);
          this.bol_err = true;
          this.msg_err = 'Error en registro de usuario';
        },
        complete: () => {
          console.log('complete registrarUsuario()');
        },
      });
  }
}
