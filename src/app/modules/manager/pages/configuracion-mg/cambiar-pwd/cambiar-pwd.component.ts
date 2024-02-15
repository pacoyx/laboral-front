import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { LoginService } from 'src/app/Services/login.service';
import { IReqActPwdReclutador } from '../../../interfaces/IReqActPwdReclutador';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cambiar-pwd',
  templateUrl: './cambiar-pwd.component.html',
  styleUrls: ['./cambiar-pwd.component.scss'],
})
export class CambiarPwdComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  frmPwd: FormGroup;

  bol_loading = false;
  bol_msgOk = false;
  bol_msgErr = false;
  msg_err = '';
  vIdusuario = 0;
  suscriptionPwd!: Subscription;

  constructor() {
    this.frmPwd = this.fb.group({
      claveActual: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      claveNueva: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      claveConfirmacion: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
    });
  }
  ngOnDestroy(): void {
    if (this.suscriptionPwd) this.suscriptionPwd.unsubscribe();
  }

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdusuario = objLogin.user.id;
  }

  get claveActual() {
    return this.frmPwd.get('claveActual');
  }
  get claveNueva() {
    return this.frmPwd.get('claveNueva');
  }
  get claveConfirmacion() {
    return this.frmPwd.get('claveConfirmacion');
  }

  actualizarPwd() {
    if (this.frmPwd.value.claveNueva != this.frmPwd.value.claveConfirmacion) {
      this.bol_msgErr = true;
      this.msg_err = 'Las Contraseñas no coinciden, vuelve a intentar !';

      setTimeout(() => {
        this.bol_msgErr = false;
      }, 3000);

      return;
    }

    const reqPwd: IReqActPwdReclutador = {
      idReclutador: this.vIdusuario,
      passwordActual: this.frmPwd.value.claveActual,
      passwordNuevo: this.frmPwd.value.claveNueva,
    };

    this.bol_loading = true;
    this.suscriptionPwd = this.empresaService
      .actualizarPasswordReclutador(reqPwd)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.bol_loading = false;
          this.bol_msgOk = true;

          setTimeout(() => {
            this.bol_msgOk = false;
          }, 2000);
        },
        error: (err) => {
          console.log(err);
          this.bol_loading = false;
          this.bol_msgErr = true;
          this.msg_err = 'Error al intentar actualizar el password.';

          setTimeout(() => {
            this.bol_msgErr = false;
          }, 2000);
        },
        complete: () => {
          console.log('complete actualizarPasswordReclutador()');
        },
      });
  }
}
