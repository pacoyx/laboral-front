import { Component, inject,OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { IReqExisteLogin } from 'src/app/interfaces/IReqExisteLogin';
import { map } from 'rxjs';
import { IReqRegEmpresa } from '../../../interfaces/IReqRegEmpresa';
import { EmpresaService } from '../../../services/empresa.service';


@Component({
  selector: 'app-cambiar-perfil',
  templateUrl: './cambiar-perfil.component.html',
  styleUrls: ['./cambiar-perfil.component.scss']
})
export class CambiarPerfilComponent implements OnInit {
  private empresaService = inject(EmpresaService);
  private loginService = inject(LoginService);
  private fb = inject(FormBuilder);

  vIdUsuario = 0;
  vEmpleador = '';
  vCorreo = '';
  vCelular = '';
  frmReclutador: FormGroup;
  bol_loading = false;
  bol_msgOk = false;
  bol_msgErr = false;
  msg_err = '';

  constructor() {
   
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
      uploadedImage1: new FormControl(['']),
    });
  }

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);
    this.vEmpleador = objLogin.user.nombres_completo;
    this.vCorreo = objLogin.user.correo_corporativo;
    this.vCelular = objLogin.user.celular;
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
    return this.frmReclutador.get('nombreCompleto');
  }

  get correo() {
    return this.frmReclutador.get('correo');
  }
  get celular() {
    return this.frmReclutador.get('celular');
  }
  
  get nombreEmpresa() {
    return this.frmReclutador.get('nombreEmpresa');
  }


  onFileSelect2(event: any) {
    const file = event.target.files[0];
    this.frmReclutador.get('uploadedImage1')!.setValue(file);
  }

  guardarDatosEmpresa() {
    if (this.frmReclutador.invalid) {
      this.bol_msgErr = true;
      this.msg_err = 'Debe completar los campos.';
      setTimeout(() => {
        this.bol_msgErr = false;
      }, 2000);
      return;
    }

    const reqRegEmp: IReqRegEmpresa = {
      idusuario: this.vIdUsuario,
      nombreEmpresa: this.frmReclutador.value.nombreEmpresa,
      ubicacion: this.frmReclutador.value.ubicacion,
      url: this.frmReclutador.value.url,
    };

    const imageForm = new FormData();
    imageForm.append('myFile', this.frmReclutador.get('uploadedImage1')!.value);
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
