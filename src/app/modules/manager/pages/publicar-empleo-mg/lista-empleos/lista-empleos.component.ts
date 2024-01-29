import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListaEmpleos } from '../../../interfaces/IListaEmpleos';

@Component({
  selector: 'app-lista-empleos',
  templateUrl: './lista-empleos.component.html',
  styleUrls: ['./lista-empleos.component.scss'],
})
export class ListaEmpleosComponent {
  @Input() listEmpleos: IListaEmpleos[] = [];
  @Output() sendEmpleo = new EventEmitter<IListaEmpleos>(); 

  verEmpleo(empleo: IListaEmpleos) {
    // console.log('empleo???>', empleo);
    this.sendEmpleo.emit(empleo);
  }
}
