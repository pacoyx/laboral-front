import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicar-empleo-mg',
  templateUrl: './publicar-empleo-mg.component.html',
  styleUrls: ['./publicar-empleo-mg.component.scss']
})
export class PublicarEmpleoMgComponent {
private router = inject(Router);

irEditar(){
  this.router.navigate(['/manager/publicar-editar']);
}

}
