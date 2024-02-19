import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidato-respuestas',
  templateUrl: './candidato-respuestas.component.html',
  styleUrls: ['./candidato-respuestas.component.scss']
})
export class CandidatoRespuestasComponent {
  private activatedRoute = inject(ActivatedRoute);

  jobId:number=0;
  clienteId:number=0;

  constructor() {
    this.jobId = this.activatedRoute.snapshot.params['jobId'];
    this.clienteId = this.activatedRoute.snapshot.params['idcliente'];
  }



  

}
