import { Component } from '@angular/core';
import { Datachat } from '../../interfaces/IDatachat';

@Component({
  selector: 'app-publicar-empleo-editar',
  templateUrl: './publicar-empleo-editar.component.html',
  styleUrls: ['./publicar-empleo-editar.component.scss']
})
export class PublicarEmpleoEditarComponent {

xdataChat:Datachat= {
  preguntas: [],
  respuestas: [],
};


}
