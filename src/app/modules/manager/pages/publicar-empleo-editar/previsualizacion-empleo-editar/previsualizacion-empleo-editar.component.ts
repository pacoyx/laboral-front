import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-previsualizacion-empleo-editar',
  templateUrl: './previsualizacion-empleo-editar.component.html',
  styleUrls: ['./previsualizacion-empleo-editar.component.scss'],
})
export class PrevisualizacionEmpleoEditarComponent {
  arrMensajes = ['Estamos generando la publicación'];
  mensaje = 'Estamos generando la publicación';

  publicarEmpleo() {
    $('#modalPublicar').modal('show');

    this.mensaje = 'Estamos generando la publicación';
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
}
