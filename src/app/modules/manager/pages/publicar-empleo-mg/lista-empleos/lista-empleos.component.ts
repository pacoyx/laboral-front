import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IListaEmpleos } from '../../../interfaces/IListaEmpleos';
import { Subscription } from 'rxjs';
import { EmpresaService } from '../../../services/empresa.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-empleos',
  templateUrl: './lista-empleos.component.html',
  styleUrls: ['./lista-empleos.component.scss'],
})
export class ListaEmpleosComponent {
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  @Input() listEmpleos: IListaEmpleos[] = [];
  @Output() sendEmpleo = new EventEmitter<IListaEmpleos>();

  vIdUsuario = 0;
  vEmpLogo = '';
  bol_loading = false;
  unsuscription!: Subscription;

  constructor() {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = objLogin.user.id;
    this.validarDatosEmpresa();
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
