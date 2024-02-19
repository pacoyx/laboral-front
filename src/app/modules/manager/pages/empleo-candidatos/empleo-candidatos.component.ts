import { Component, OnDestroy, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { IReqListarCandiPorEmpleo } from '../../interfaces/IReqListarCandiPorEmpleo';
import { ActivatedRoute, Router } from '@angular/router';
import { IResListarCandiPorEmpleoDet } from '../../interfaces/IResListarCandiPorEmpleo';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-empleo-candidatos',
  templateUrl: './empleo-candidatos.component.html',
  styleUrls: ['./empleo-candidatos.component.scss'],
})
export class EmpleoCandidatosComponent implements OnDestroy {
  private empresaService = inject(EmpresaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  lstCandidatos: IResListarCandiPorEmpleoDet[] = [];
  suscriptionListar!: Subscription;
  jobId: number = 0;

  constructor() {
    this.jobId = this.activatedRoute.snapshot.params['jobId'];
    this.cargarCandidatosPorEmpleo(this.jobId);
  }

  ngOnDestroy(): void {
    if (this.suscriptionListar) this.suscriptionListar.unsubscribe();
  }

  irRespuestas(idCliente: number) {
    this.router.navigate([
      '/manager/candidatos/' + this.jobId + '/respuestas/' + idCliente,
    ]);
  }

  cargarCandidatosPorEmpleo(empleoId: number) {
    const req: IReqListarCandiPorEmpleo = {
      idJob: empleoId,
    };
    this.suscriptionListar = this.empresaService
      .listarCandidatosPorEmpleo(req)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.lstCandidatos = resp.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete listarCandidatosPorEmpleo()');
        },
      });
  }

  verSeleccionar(idcliente: number) {
    $('#modalSeleccionar').modal('show');
  }

  verEliminar(idcliente: number) {
    $('#modalEliminar').modal('show');
  }

  seleccionarCandidato() {
    $('#modalSeleccionar').modal('hide');
    $('#modalSeleccionado').modal('show');
  }

  eliminarCandidato() {
    $('#modalEliminar').modal('hide');
    $('#modalEliminado').modal('show');
  }
}
