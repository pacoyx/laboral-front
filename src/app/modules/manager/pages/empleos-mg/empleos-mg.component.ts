import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-empleos-mg',
  templateUrl: './empleos-mg.component.html',
  styleUrls: ['./empleos-mg.component.scss'],
})
export class EmpleosMgComponent {
private router = inject(Router);


  bol_tabAbierto = false;

  handleEstado(event: any) {
    console.log('evento combo=>', event.target.value);

    if (event.target.value == 'C'){
      $('#modalCerrar').modal('show')
    }
  }

  verCandidatos(idEmpleo:number){
    this.router.navigate(['/manager/candidatos']);
  }
}
