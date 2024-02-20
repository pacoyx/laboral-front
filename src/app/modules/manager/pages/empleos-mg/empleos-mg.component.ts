import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { IReqListarEmpleosOpenClose } from '../../interfaces/IReqListarEmpleosOpenClose';
import { IReqEliEmpleosPorIds } from '../../interfaces/IReqEliEmpleosPorIds';
import { Subscription } from 'rxjs';
import { EventMediatorService } from '../../services/event-mediator.service';
import { environment } from 'src/environments/environment';
import { IResListarEmpleosOpenCloseDet } from '../../interfaces/IResListarEmpleosOpenClose';

declare var $: any;

@Component({
  selector: 'app-empleos-mg',
  templateUrl: './empleos-mg.component.html',
  styleUrls: ['./empleos-mg.component.scss'],
})
export class EmpleosMgComponent implements OnInit, OnDestroy {
  
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private mediatorService = inject(EventMediatorService);

  bol_tabAbierto = false;
  vIdUsuario = 0;
  dataEmpleos: any[] = [];
  bol_loading = false;
  bol_deleting = false;
  listaIdsDelete: number[] = [];
  vEmpLogo = '';

  suscriptionEli!:Subscription;
  suscriptionListado!:Subscription;
  
  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);
    this.vEmpLogo = environment.epImagesPublic + '/' + objLogin.company.logo;  
    this.cargarEmpleos();
  }

  ngOnDestroy(): void {
    if(this.suscriptionEli)this.suscriptionEli.unsubscribe();   
    if(this.suscriptionListado) {this.suscriptionListado.unsubscribe();}
  }
  

  cargarEmpleos() {
    const req: IReqListarEmpleosOpenClose = {
      idReclutador: this.vIdUsuario,
      estado: 'Abierto',
    };
    this.bol_loading = true;
    this.suscriptionListado = this.empresaService.listarEmpleosOpenClose(req).subscribe({
      next: (resp) => {
        this.bol_loading = false;
        console.log(resp);
        this.dataEmpleos = resp.data;
      },
      error: (err) => {
        console.log(err);
        this.bol_loading = false;
      },
      complete: () => {
        console.log('complete listarEmpleosOpenClose()');
      },
    });
  }

  handleEstado(event: any, item: any) {
    console.log('evento combo=>', event.target.value);

    // item.job_title = 'xxxx';

    if (event.target.value == 'A') {
      item.status = 'Abierto';
    }
    if (event.target.value == 'P') {
      item.status = 'Pausado';
    }

    if (event.target.value == 'C') {
      item.status = 'Cerrado';
      $('#modalCerrar').modal('show');
    }
  }

  checkValue(event: any, item: any) {
    console.log({ x: event.currentTarget.checked, item });

    if (event.currentTarget.checked) {
      this.listaIdsDelete.push(item.id_job_description);
    } else {
      this.listaIdsDelete = this.listaIdsDelete.filter(
        (i) => i != item.id_job_description
      );
    }

    console.log('this.listaIdsDelete ==>', this.listaIdsDelete);
  }

  verCandidatos(empleo: IResListarEmpleosOpenCloseDet) {
    this.mediatorService.notifyOnEmpleoChanged(empleo);

    this.router.navigate([`/manager/candidatos/${empleo.id_job_description}`]);
  }

  eliminarEmpleo() {
    const req: IReqEliEmpleosPorIds = {
      ids: [...this.listaIdsDelete],
    };
    this.bol_deleting = true;
   this.suscriptionEli =  this.empresaService.eliminarEmpleosPorIds(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.bol_deleting = false;
      },
      error: (err) => {
        console.log(err);
        this.bol_deleting = false;
      },
      complete: () => {
        console.log('complete eliminarEmpleosPorIds()');
      },
    });
  }
}
