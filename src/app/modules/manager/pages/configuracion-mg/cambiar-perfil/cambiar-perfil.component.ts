import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { IReqExisteLogin } from 'src/app/interfaces/IReqExisteLogin';
import { map, Observable, of } from 'rxjs';
import { IReqRegEmpresa } from '../../../interfaces/IReqRegEmpresa';
import { EmpresaService } from '../../../services/empresa.service';
import { IReqActDataReclutador } from '../../../interfaces/IReqActDataReclutador';
import { IReqListarReclutadorPorId } from '../../../interfaces/IReqListarReclutadorPorId';
import { EventMediatorService } from '../../../services/event-mediator.service';

@Component({
  selector: 'app-cambiar-perfil',
  templateUrl: './cambiar-perfil.component.html',
  styleUrls: ['./cambiar-perfil.component.scss'],
})
export class CambiarPerfilComponent implements OnInit {
  private empresaService = inject(EmpresaService);
  private loginService = inject(LoginService);
  private eventMediator = inject(EventMediatorService);
  private fb = inject(FormBuilder);

  vIdUsuario = 0;
  vEmpleador = '';
  vCorreo = '';
  vCelular = '';
  vIconoActual = '';
  frmReclutador: FormGroup;
  bol_loading = false;
  bol_msgOk = false;
  bol_msgErr = false;
  msg_err = '';
  vTipoLogin='';
  vDatahidden:any={correo:'', nombre:'', imagen:''};

  constructor() {
    this.frmReclutador = this.fb.group({
      correo: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.validarEmail.bind(this)],
          updateOn: 'blur',
        },
      ],
      nombreUsuario: [''],
      nombres: [''],
      apellidos: [''],
      celular: ['', { validators: Validators.required }],
      direccion: [''],
      ubicacion: [''],
      uploadedImage1: new FormControl(['']),
    });
  }

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);
    this.vEmpleador = objLogin.user.nombres_completo;
    this.vCorreo = objLogin.user.correo_corporativo;
    this.vCelular = objLogin.user.celular;
    this.vIconoActual = objLogin.user.icono;
    this.vTipoLogin = objLogin.tipo;
    this.cargarDataReclutador();
  }

  cargarDataReclutador() {
    const req: IReqListarReclutadorPorId = {
      idRecruiter: this.vIdUsuario,
    };
    this.empresaService.listarReclutadorPorId(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.frmReclutador.get('correo')?.setValue(resp.data.email);
        this.vCorreo = resp.data.email;
        this.vDatahidden.correo = resp.data.email;
        this.vDatahidden.nombre = resp.data.name;
        this.vDatahidden.imagen = '';

        this.frmReclutador.get('nombreUsuario')?.setValue(resp.data.user_name);
        this.frmReclutador.get('nombres')?.setValue(resp.data.name);
        this.frmReclutador.get('apellidos')?.setValue(resp.data.last_name);
        this.frmReclutador.get('celular')?.setValue(resp.data.cell_number);
        this.frmReclutador.get('direccion')?.setValue(resp.data.address);
        this.frmReclutador.get('ubicacion')?.setValue(resp.data.location);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete listarReclutadorPorId(req)');
      },
    });
  }

  validarEmail(control: AbstractControl) {
    console.log('entro al checkmail');

    if (this.vCorreo == control.value) {
      return new Observable((subscriber) => {
        console.log('correo original');
        subscriber.next(null);
      });
    }

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

  get correo() {
    return this.frmReclutador.get('correo');
  }
  get celular() {
    return this.frmReclutador.get('celular');
  }

  onFileSelect2(event: any) {
    const file = event.target.files[0];
    this.frmReclutador.get('uploadedImage1')!.setValue(file);
  }

  guardarDatosReclutador() {
    if (this.frmReclutador.invalid) {
      this.bol_msgErr = true;
      this.msg_err = 'Debe completar los campos.';
      setTimeout(() => {
        this.bol_msgErr = false;
      }, 2000);
      return;
    }

    const reqDatosReclutador: IReqActDataReclutador = {
      idReclutador: this.vIdUsuario,
      correo: this.frmReclutador.value.correo,
      nombreUsuario: this.frmReclutador.value.nombreUsuario,
      nombres: this.frmReclutador.value.nombres,
      apellidos: this.frmReclutador.value.apellidos,
      celular: this.frmReclutador.value.celular,
      direccion: this.frmReclutador.value.direccion,
      ubicacion: this.frmReclutador.value.ubicacion,
      icono: this.vIconoActual,
    };

    const imageForm = new FormData();
    imageForm.append('myFile', this.frmReclutador.get('uploadedImage1')!.value);
    imageForm.append('infoData', JSON.stringify(reqDatosReclutador));

    this.bol_loading = true;
    this.empresaService.actualizarReclutador(imageForm).subscribe({
      next: (resp) => {
        console.log(resp);
        this.bol_loading = false;
        this.bol_msgOk = true;
        setTimeout(() => {
          this.bol_msgOk = false;
        }, 2000);
        this.eventMediator.notifyOnAvatarChanged({
          icono: resp.icono,
          nombreUsuario: reqDatosReclutador.nombreUsuario,
        });

        const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
        if(resp.icono != ''){
          objLogin.user.icono = resp.icono;
        }
        objLogin.user.user_name = reqDatosReclutador.nombreUsuario;
        localStorage.setItem('laboral.ai', JSON.stringify(objLogin));
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
