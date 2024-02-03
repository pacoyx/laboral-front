import { Component, Input, inject } from '@angular/core';
import { Datachat } from '../../../interfaces/IDatachat';
import { EmpresaService } from '../../../services/empresa.service';
import { IReqRegEmpleo } from '../../../interfaces/IReqRegEmpleo';

declare var $: any;

@Component({
  selector: 'app-previsualizacion-empleo-editar',
  templateUrl: './previsualizacion-empleo-editar.component.html',
  styleUrls: ['./previsualizacion-empleo-editar.component.scss'],
})
export class PrevisualizacionEmpleoEditarComponent {
  @Input() dataPreview!: Datachat[];
  private empresaService = inject(EmpresaService);

  mensaje = 'Estamos generando la publicación';
  // bolConData = false;
  vIdUsuario = 0;
  bolErr = false;

  constructor() {
    this.dataPreview = [];

    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);
    console.log('this.vIdUsuario==>', this.vIdUsuario);
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
    };

    this.mensaje = 'Estamos generando la publicación';
    this.empresaService.registrarEmpleo(req).subscribe({
      next: (resp) => {
        console.log(resp);

        if (resp.codigoRespuesta == '00') {
          $('#modalPublicar').modal('show');
          setTimeout(() => {
            this.mensaje = 'ya falta poco';
            setTimeout(() => {
              this.mensaje = '¡Listo! el empleo ya esta publicado';
              setTimeout(() => {
                $('#modalPublicar').modal('hide');
              }, 2000);
            }, 2000);
          }, 2000);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete registrarEmpleo()');
      },
    });
  }
}
