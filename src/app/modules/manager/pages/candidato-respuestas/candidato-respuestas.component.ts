import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { IReqListarCandiPorEmpleo } from '../../interfaces/IReqListarCandiPorEmpleo';
import { IResListarPregPorEmpleoDet } from '../../interfaces/IResListarPregPorEmpleo';
import { EventMediatorService } from '../../services/event-mediator.service';
import { IResListarCandiPorEmpleoDet } from '../../interfaces/IResListarCandiPorEmpleo';

@Component({
  selector: 'app-candidato-respuestas',
  templateUrl: './candidato-respuestas.component.html',
  styleUrls: ['./candidato-respuestas.component.scss'],
})
export class CandidatoRespuestasComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private empresaService = inject(EmpresaService);
  private mediatorService = inject(EventMediatorService);

  jobId: number = 0;
  clienteId: number = 0;
  arrPreguntas!: IResListarPregPorEmpleoDet[];
  objCandidato!: IResListarCandiPorEmpleoDet | null;

  constructor() {
    this.jobId = this.activatedRoute.snapshot.params['jobId'];
    this.clienteId = this.activatedRoute.snapshot.params['idcliente'];
  }

  ngOnInit(): void {
    this.cargarPreguntas();
    this.cargarCandidato();
  }

  cargarCandidato() {
    this.mediatorService.candidatoChanged.subscribe({
      next: (resp) => {
        console.log(resp);
        this.objCandidato = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete mediatorService.candidatoChanged()');
      },
    });
  }

  cargarPreguntas() {
    const req: IReqListarCandiPorEmpleo = { idJob: this.jobId };
    this.empresaService.listarPreguntasPorEmpleo(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.arrPreguntas = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete listarPreguntasPorEmpleo()');
      },
    });
  }
}
