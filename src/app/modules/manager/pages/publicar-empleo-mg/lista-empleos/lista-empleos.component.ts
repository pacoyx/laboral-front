import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { IListaEmpleos } from '../../../interfaces/IListaEmpleos';
import { Subscription } from 'rxjs';
import { EmpresaService } from '../../../services/empresa.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EventMediatorService } from '../../../services/event-mediator.service';

@Component({
  selector: 'app-lista-empleos',
  templateUrl: './lista-empleos.component.html',
  styleUrls: ['./lista-empleos.component.scss'],
})
export class ListaEmpleosComponent implements OnDestroy {
  private empresaService = inject(EmpresaService);
  private mediatorService = inject(EventMediatorService);

  @Input() listEmpleos: IListaEmpleos[] = [];
  @Output() sendEmpleo = new EventEmitter<IListaEmpleos>();

  vIdUsuario = 0;
  vEmpLogo = '';
  bol_loading = false;
  unsuscription!: Subscription;
  unsuscriptionMediator!: Subscription;

  constructor() {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = objLogin.user.id;
    // this.validarDatosEmpresa();
    // this.getLogoFromMediator();
    this.vEmpLogo = environment.epImagesPublic + '/' + objLogin.company.logo;
    
  }

  ngOnDestroy(): void {
    if (this.unsuscriptionMediator) {
      this.unsuscriptionMediator.unsubscribe();
    }
  }

  getLogoFromMediator() {
    this.unsuscriptionMediator = this.mediatorService.companyChanged.subscribe({
      next: (resp) => {
        console.log(resp);
        this.vEmpLogo = environment.epImagesPublic + '/' + resp?.logo;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete mediatorService.companyChanged()');
      },
    });
  }

  verEmpleo(empleo: IListaEmpleos) {
    this.sendEmpleo.emit(empleo);
  }

  validarDatosEmpresa() {
    this.bol_loading = true;
    this.unsuscription = this.empresaService
      .listarEmpresaPorUsuario(this.vIdUsuario)
      .subscribe({
        next: (resp) => {
          this.bol_loading = false;
          console.log('data company=>', resp);
          if (resp.hasData) {
            this.vEmpLogo = environment.epImagesPublic + '/' + resp.data.icon;
          }
        },
        error: (err) => {
          console.log(err);
          this.bol_loading = false;
        },
        complete: () => {
          console.log('complete listarEmpresaPorUsuario()');
        },
      });
  }
}
