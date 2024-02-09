import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { environment } from 'src/environments/environment';
import { AuthGoogleService } from 'src/app/Services/auth-google.service';

@Component({
  selector: 'app-landing-manager',
  templateUrl: './landing-manager.component.html',
  styleUrls: ['./landing-manager.component.scss'],
})
export class LandingManagerComponent implements OnInit {
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

  frmDatos: FormGroup;
  bol_loading = false;

  constructor() {
    console.log('constructor()');

    this.frmDatos = new FormGroup({
      nombreEmpresa: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });
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
    console.log('ngOnInit()');

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

  validarDatosEmpresa() {
    this.bol_loading = true;
    this.empresaService.listarEmpresaPorUsuario(this.vIdUsuario).subscribe({
      next: (resp) => {
        this.bol_loading = false;

        if (!resp.hasData) {
          this.router.navigate(['/manager/perfil']);
          return;
        }

        console.log('data empresa', resp);
        if (resp.hasData) {
          this.vEmpNombre = resp.data.name;
          this.vEmpRating = resp.data.rating;
          this.vEmpUbicacion = resp.data.location;
          this.vEmpWeb = resp.data.webpage;
          this.vEmpLogo = environment.epImagesPublic + '/' + resp.data.icon;
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
}
