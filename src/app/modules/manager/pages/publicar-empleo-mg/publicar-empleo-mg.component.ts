import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IListaEmpleos } from '../../interfaces/IListaEmpleos';

@Component({
  selector: 'app-publicar-empleo-mg',
  templateUrl: './publicar-empleo-mg.component.html',
  styleUrls: ['./publicar-empleo-mg.component.scss'],
})
export class PublicarEmpleoMgComponent {
  private router = inject(Router);

  arrEmpleos :IListaEmpleos[]= [
    { img: '', titulo: 'Programador Jr .Net Core', modalidad: 'remoto' },
    { img: '', titulo: 'Devloper java full stack', modalidad: 'presencial' },
    { img: '', titulo: 'Administrador de azure', modalidad: 'hibrido' },
  ];

  irEditar() {
    this.router.navigate(['/manager/publicar-editar']);
  }
}
