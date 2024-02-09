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
import { environment } from 'src/environments/environment';


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
  pathImgAvatar = '';
  icono = '';

  frmDatos: FormGroup;
  bol_loading = false;
  bol_msgOk = false;
  bol_msgErr = false;
  bol_SaveOk=false;
  msg_err = '';

  constructor() {
    this.frmDatos = new FormGroup({
      idcompany: new FormControl(0),
      ruc: new FormControl('', Validators.required),
      nombreEmpresa: new FormControl('', Validators.required),      
      rating: new FormControl(''),
      ubicacion: new FormControl(''),
      linkedin: new FormControl(''),
      url: new FormControl(''),      
      about: new FormControl(''),
      uploadedImage1: new FormControl(['']),
    });
   
  }

  get about() {
    return this.frmDatos.get('about');
  }

  get linkedin() {
    return this.frmDatos.get('linkedin');
  }

  get rating() {
    return this.frmDatos.get('rating');
  }

  get ruc() {
    return this.frmDatos.get('ruc');
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
    this.icono = objLogin.user.icono || '';
    
    this.pathImgAvatar =
    objLogin.tipo == 'sistema'
      ? environment.epImagesPublic + '/' + this.icono
      : this.icono;


    $('#modalEditarDatosEmp').on('hidden.bs.modal',  (event:any)=> {
      console.log('event===========>',event);
      if(this.bol_SaveOk){
        this.router.navigate(['/manager']);
      }
    });
  }

  irConfiguracion() {
    this.router.navigate(['/manager/configuracion']);
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.frmDatos.get('uploadedImage1')!.setValue(file);
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
      idCompany: 0,
      ruc: this.frmDatos.value.ruc,
      name: this.frmDatos.value.nombreEmpresa,
      icon: '',
      rating: this.frmDatos.value.rating,
      location: this.frmDatos.value.ubicacion,
      linkedin: this.frmDatos.value.linkedin,
      webpage: this.frmDatos.value.url,
      endorse: '0',
      about: this.frmDatos.value.about,
      idUser: this.vIdUsuario
    };
    

    const imageForm = new FormData();
    imageForm.append('myFile', this.frmDatos.get('uploadedImage1')!.value);
    imageForm.append('infoData', JSON.stringify(reqRegEmp));

    this.bol_loading = true;
    this.empresaService.registrarEmpresa(imageForm).subscribe({
      next: (resp) => {       
        this.bol_loading = false;
        this.bol_msgOk = true;
        setTimeout(() => {
          this.bol_msgOk = false;
          this.bol_SaveOk=true;
          // this.router.navigate(['/manager']);
        }, 2000);

        
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
