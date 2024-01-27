import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-cambiar-pwd',
  templateUrl: './cambiar-pwd.component.html',
  styleUrls: ['./cambiar-pwd.component.scss'],
})
export class CambiarPwdComponent {
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  frmPwd: FormGroup;

  bol_loading = false;
  bol_msgOk = false;
  bol_msgErr = false;
  msg_err = '';

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

    const reqPwd = {
      claveActual: this.frmPwd.value.claveActual,
      claveNueva: this.frmPwd.value.claveNueva,
    };

    this.bol_loading = true;
    setTimeout(() => {
      this.bol_loading = false;
      this.bol_msgOk = true;

      setTimeout(() => {
        this.bol_msgOk = false;
      }, 2000);
    }, 2000);
  }
}
