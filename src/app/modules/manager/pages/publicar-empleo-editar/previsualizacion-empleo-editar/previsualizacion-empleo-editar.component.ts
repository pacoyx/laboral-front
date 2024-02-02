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
  @Input() dataPreview!: Datachat ;
  private empresaService = inject(EmpresaService);

  mensaje = 'Estamos generando la publicación';
  // bolConData = false;
  vIdUsuario = 0;
  bolErr = false;

  constructor() {
    this.dataPreview = {
      preguntas: [],
      respuestas: [],
    };

    

    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);
    console.log('this.vIdUsuario==>', this.vIdUsuario);
  }

 
  publicarEmpleo() {
    if (this.dataPreview!.respuestas.length == 0) {
      this.bolErr = true;
      setTimeout(() => {
        this.bolErr = false;
      }, 2000);
      return;
    }

    const req: IReqRegEmpleo = {
      job_title: this.dataPreview.respuestas[0],
      job_offer_link: '',
      company: '',
      req_qualifications: this.dataPreview.respuestas[1],
      pref_qualifications: '',
      key_responsabilities: this.dataPreview.respuestas[2],
      techskill_tool: this.dataPreview.respuestas[3],
      language: '',
      knowledge: '',
      softskills: '',
      career_background: '',
      location: this.dataPreview.respuestas[5],
      salary: Number.parseInt(this.dataPreview.respuestas[6]),
      date_entry: this.dataPreview.respuestas[7],
      date_expiration: this.dataPreview.respuestas[7],
      number_positions: Number.parseInt(this.dataPreview.respuestas[4]),
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
