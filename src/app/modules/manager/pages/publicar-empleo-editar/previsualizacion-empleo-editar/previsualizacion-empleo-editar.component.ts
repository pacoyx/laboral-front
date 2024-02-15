import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Datachat } from '../../../interfaces/IDatachat';
import { EmpresaService } from '../../../services/empresa.service';
import { IReqRegEmpleo } from '../../../interfaces/IReqRegEmpleo';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-previsualizacion-empleo-editar',
  templateUrl: './previsualizacion-empleo-editar.component.html',
  styleUrls: ['./previsualizacion-empleo-editar.component.scss'],
})
export class PrevisualizacionEmpleoEditarComponent  implements OnInit, OnDestroy{
  @Input() dataPreview!: Datachat[];
  private empresaService = inject(EmpresaService);
  private router = inject(Router);

  mensaje = 'Estamos generando la publicación';  
  vIdUsuario = 0;
  vCorreo = '';
  vNombreUsuario = '';
  bolErr = false;

  vEmpNombre = 'Nombre empresa';  
  vEmpLogo = '';
  bol_loading = false;
  bol_Grabando = false;
  suscriptionGrabar!:Subscription;
  suscriptionValidar!:Subscription;


  constructor() {
    this.dataPreview = [];
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);    
    this.vCorreo = objLogin.user.correo_corporativo;
    this.vNombreUsuario = objLogin.user.nombres_completo;
  }

  ngOnDestroy(): void {
     if(this.suscriptionGrabar)this.suscriptionGrabar.unsubscribe();
     if(this.suscriptionValidar)this.suscriptionValidar.unsubscribe();
  }
  
  ngOnInit(): void {
    this.validarDatosEmpresa();
  }

  publicarEmpleo() {
    if (this.dataPreview.length == 0) {
      this.bolErr = true;
      setTimeout(() => {
        this.bolErr = false;
      }, 2000);
      return;
    }

    const req: IReqRegEmpleo = {
      job_title: this.dataPreview[0].resp,
      job_offer_link: '',
      company: '',
      req_qualifications: this.dataPreview[1].resp,
      pref_qualifications: '',
      key_responsabilities: this.dataPreview[2].resp,
      techskill_tool: this.dataPreview[3].resp,
      language: '',
      knowledge: '',
      softskills: '',
      career_background: '',
      location: this.dataPreview[5].resp,
      salary: Number.parseInt(this.dataPreview[6].resp),
      date_entry: this.dataPreview[7].resp,
      date_expiration: this.dataPreview[7].resp,
      number_positions: Number.parseInt(this.dataPreview[4].resp),
      status: 'Abierto',
      nps: '',
      id_recruiter: this.vIdUsuario,
      modality: this.dataPreview[8].resp,
      correo: this.vCorreo,
      nombre: this.vNombreUsuario
    };

    this.bol_Grabando = true;
    this.mensaje = 'Estamos generando la publicación';
    this.suscriptionGrabar = this.empresaService.registrarEmpleo(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.bol_Grabando = false;
        if (resp.codigoRespuesta == '00') {
          $('#modalPublicar').modal('show');
          setTimeout(() => {
            this.mensaje = 'ya falta poco';
            setTimeout(() => {
              this.mensaje = '¡Listo! el empleo ya esta publicado';
              setTimeout(() => {
                $('#modalPublicar').modal('hide');
                this.router.navigate(['/manager/publicar']);
              }, 2000);
            }, 2000);
          }, 2000);
        }
      },
      error: (err) => {
        console.log(err);
        this.bol_Grabando = false;
      },
      complete: () => {
        console.log('complete registrarEmpleo()');
      },
    });
  }

  validarDatosEmpresa() {
    this.bol_loading = true;    
    this.suscriptionValidar = this.empresaService.listarEmpresaPorUsuario(this.vIdUsuario).subscribe({
      next: (resp) => {
        this.bol_loading = false;                
        if (resp.hasData) {
          this.vEmpNombre = resp.data.name;          
          this.vEmpLogo = environment.epImagesPublic +'/'+ resp.data.icon;
        }
      },
      error: (err) => {
        console.log(err);
        this.bol_loading = false;
      },
      complete: () => {
        console.log('listarEmpresaPorUsuario()');
      },
    });
  }

}
