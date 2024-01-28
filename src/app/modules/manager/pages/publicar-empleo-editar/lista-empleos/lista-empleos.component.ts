import { Component, Input } from '@angular/core';
import { IListaEmpleos } from '../../../interfaces/IListaEmpleos';

@Component({
  selector: 'app-lista-empleos',
  templateUrl: './lista-empleos.component.html',
  styleUrls: ['./lista-empleos.component.scss']
})
export class ListaEmpleosComponent {


  @Input() listEmpleos: IListaEmpleos[] = [];


  
}
