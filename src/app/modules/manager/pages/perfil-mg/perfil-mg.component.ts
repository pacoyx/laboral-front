import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { IReqRegEmpresa } from '../../interfaces/IReqRegEmpresa';
import { LoginService } from 'src/app/Services/login.service';
import { IReqExisteLogin } from 'src/app/interfaces/IReqExisteLogin';
import { map } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-perfil-mg',
  templateUrl: './perfil-mg.component.html',
  styleUrls: ['./perfil-mg.component.scss'],
})
export class PerfilMgComponent {
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  vIdUsuario = 0;
  vEmpleador = '';
  vCorreo = '';
  vCelular = '';

  frmDatos: FormGroup;
  frmReclutador: FormGroup;
  bol_loading = false;
  bol_msgOk = false;
  bol_msgErr = false;
  msg_err = '';

  constructor() {
    this.frmDatos = new FormGroup({
      nombreEmpresa: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      uploadedImage1: new FormControl(['']),
    });

    this.frmReclutador = this.fb.group({
      nombreCompleto: ['', { validators: [Validators.required] }],
      nombreEmpresa: ['', { validators: [Validators.required] }],
      correo: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.validarEmail.bind(this)],
          updateOn: 'blur',
        },
      ],
      celular: ['', { validators: Validators.required }],
      clave: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      uploadedImage1: new FormControl(['']),
    });
  }

  get nombreCompleto() {
    return this.frmReclutador.get('nombreCompleto');
  }
  get nombreEmpresaRe() {
    return this.frmReclutador.get('nombreEmpresa');
  }
  get correo() {
    return this.frmReclutador.get('correo');
  }
  get celular() {
    return this.frmReclutador.get('celular');
  }
  get clave() {
    return this.frmReclutador.get('clave');
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

  get nombreEmpresa() {
    return this.frmDatos.get('nombreEmpresa');
  }
  get ubicacion() {
    return this.frmDatos.get('ubicacion');
  }
  get url() {
    return this.frmDatos.get('url');
  }

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);
    this.vEmpleador = objLogin.user.nombres_completo;
    this.vCorreo = objLogin.user.correo_corporativo;
    this.vCelular = objLogin.user.celular;
  }

  irConfiguracion() {
    this.router.navigate(['/manager/configuracion']);
  }

  

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.frmDatos.get('uploadedImage1')!.setValue(file);
  }

  onFileSelect2(event: any) {
    const file = event.target.files[0];
    this.frmReclutador.get('uploadedImage1')!.setValue(file);
  }

  guardarDatosEmpresa() {
    if (this.frmDatos.invalid) {
      this.bol_msgErr = true;
      this.msg_err = 'Debe completar los campos.';
      setTimeout(() => {
        this.bol_msgErr = false;
      }, 2000);
      return;
    }

    const reqRegEmp: IReqRegEmpresa = {
      idusuario: this.vIdUsuario,
      nombreEmpresa: this.frmDatos.value.nombreEmpresa,
      ubicacion: this.frmDatos.value.ubicacion,
      url: this.frmDatos.value.url,
    };

    const imageForm = new FormData();
    imageForm.append('myFile', this.frmDatos.get('uploadedImage1')!.value);
    imageForm.append('infoData', JSON.stringify(reqRegEmp));

    this.bol_loading = true;
    this.empresaService.registrarEmpresa(imageForm).subscribe({
      next: (resp) => {
        console.log(resp);
        this.bol_loading = false;
        this.bol_msgOk = true;
        setTimeout(() => {
          this.bol_msgOk = false;
        }, 2000);

        // $('#myModal').modal('hide');
      },
      error: (err) => {
        console.log(err);
        this.bol_loading = false;
        this.bol_msgErr = true;
        this.msg_err = 'Error interno!';
        setTimeout(() => {
          this.bol_msgErr = false;
        }, 2000);
      },
      complete: () => {
        console.log('complete registrarEmpresa()');
      },
    });
  }
}
