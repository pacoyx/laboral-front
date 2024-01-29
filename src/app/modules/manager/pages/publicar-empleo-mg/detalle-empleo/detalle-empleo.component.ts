import { Component, Input } from '@angular/core';
import { IListaEmpleos } from '../../../interfaces/IListaEmpleos';


@Component({
  selector: 'app-detalle-empleo',
  templateUrl: './detalle-empleo.component.html',
  styleUrls: ['./detalle-empleo.component.scss']
})
export class DetalleEmpleoComponent {

@Input() empleo!:IListaEmpleos;

editar(){
  
}

}
