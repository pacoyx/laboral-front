import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { environment } from 'src/environments/environment';
import { AuthGoogleService } from 'src/app/Services/auth-google.service';
import { IReqRegEmpresa } from '../../interfaces/IReqRegEmpresa';
import { IResListarEmpPorUsuData } from '../../interfaces/IResListarEmpPorUsu';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-landing-manager',
  templateUrl: './landing-manager.component.html',
  styleUrls: ['./landing-manager.component.scss'],
})
export class LandingManagerComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private authGoogleService = inject(AuthGoogleService);

  vIdUsuario = 0;
  vEmpleador = '';
  vCorreo = '';
  vCelular = '';
  pathImgAvatar = '';
  icono = '';

  vEmpNombre = 'Nombre empresa';
  vEmpRating = 0.0;
  vEmpUbicacion = 'Lima, Peru';
  vEmpWeb = '';
  vEmpLogo = '';
  vAbout = '';
  vRuc = '';

  frmDatos: FormGroup;
  bol_loading = false;
  bol_msgOk = false;
  bol_msgErr = false;
  bol_SaveOk = false;
  msg_err = '';
  objEmpresa!: IResListarEmpPorUsuData;

  unsuscription!: Subscription;
  unsuscriptionSave!: Subscription;

  constructor() {
    this.frmDatos = new FormGroup({
      idcompany: new FormControl(0),
      ruc: new FormControl('', Validators.required),
      nombreEmpresa: new FormControl('', Validators.required),
      rating: new FormControl(0),
      ubicacion: new FormControl(''),
      linkedin: new FormControl(''),
      url: new FormControl(''),
      about: new FormControl(''),
      uploadedImage1: new FormControl(['']),
    });
  }
  ngOnDestroy(): void {
    if (this.unsuscription) this.unsuscription!.unsubscribe();
    if (this.unsuscriptionSave) this.unsuscriptionSave.unsubscribe();
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
    this.vIdUsuario = objLogin.user.id;
    this.vEmpleador = objLogin.user.nombres_completo;
    this.vCorreo = objLogin.user.correo_corporativo;
    this.vCelular = objLogin.user.celular;

    this.icono = objLogin.user.icono || '';

    this.pathImgAvatar =
      objLogin.tipo == 'sistema'
        ? environment.epImagesPublic + '/' + this.icono
        : this.icono;

    this.validarDatosEmpresa();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.frmDatos.get('uploadedImage1')!.setValue(file);
  }

  validarDatosEmpresa() {
    this.bol_loading = true;
    this.unsuscription = this.empresaService
      .listarEmpresaPorUsuario(this.vIdUsuario)
      .subscribe({
        next: (resp) => {
          this.bol_loading = false;

          if (!resp.hasData) {
            this.router.navigate(['/manager/perfil']);
            return;
          }

          console.log('data empresa', resp);
          this.objEmpresa = resp.data;
          if (resp.hasData) {
            this.vEmpNombre = resp.data.name;
            this.vEmpRating = resp.data.rating;
            this.vEmpUbicacion = resp.data.location;
            this.vEmpWeb = resp.data.webpage;
            this.vEmpLogo = environment.epImagesPublic + '/' + resp.data.icon;
            this.vAbout = resp.data.about;
            this.vRuc = resp.data.ruc;
          }
        },
        error: (err) => {
          console.log(err);
          this.bol_loading = false;
        },
        complete: () => {
          console.log('complete listarEmpresaPorUsuario()');
        },
      });
  }

  abrirModal() {
    this.frmDatos.get('idcompany')?.setValue(this.objEmpresa.id_company);
    this.frmDatos.get('ruc')?.setValue(this.objEmpresa.ruc);
    this.frmDatos.get('nombreEmpresa')?.setValue(this.objEmpresa.name);
    this.frmDatos.get('rating')?.setValue(this.objEmpresa.rating);
    this.frmDatos.get('ubicacion')?.setValue(this.objEmpresa.location);
    this.frmDatos.get('linkedin')?.setValue(this.objEmpresa.linkedin);
    this.frmDatos.get('url')?.setValue(this.objEmpresa.webpage);
    this.frmDatos.get('about')?.setValue(this.objEmpresa.about);

    $('#modalEditarDatosEmp').modal('show');
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
      idUser: this.vIdUsuario,
      correo: '',
      nombre: '',
    };

    const imageForm = new FormData();
    imageForm.append('myFile', this.frmDatos.get('uploadedImage1')!.value);
    imageForm.append('infoData', JSON.stringify(reqRegEmp));

    this.bol_loading = true;
    this.unsuscriptionSave = this.empresaService
      .registrarEmpresa(imageForm)
      .subscribe({
        next: (resp) => {
          this.bol_loading = false;
          this.bol_msgOk = true;

          this.validarDatosEmpresa();

          setTimeout(() => {
            this.bol_msgOk = false;
            this.bol_SaveOk = true;
            $('#modalEditarDatosEmp').modal('hide');
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
