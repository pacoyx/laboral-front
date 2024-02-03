import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IListaEmpleos } from '../../interfaces/IListaEmpleos';
import { EmpresaService } from '../../services/empresa.service';

declare var $:any;
@Component({
  selector: 'app-publicar-empleo-mg',
  templateUrl: './publicar-empleo-mg.component.html',
  styleUrls: ['./publicar-empleo-mg.component.scss'],
})
export class PublicarEmpleoMgComponent implements OnInit {
  private router = inject(Router);
  private empresaService = inject(EmpresaService);

  bol_detalle = false;
  bol_LoadingEmpleos = false;
  empleoDetalle!: IListaEmpleos;
  vIdUsuario = 0;
  arrEmpleos: IListaEmpleos[] = [];

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vIdUsuario = Number.parseInt(objLogin.user.id);

    this.cargarEmpleos();
    this.verificarDataEmpresa();
  }

  verificarDataEmpresa() {
    this.empresaService.listarEmpresaPorUsuario(this.vIdUsuario).subscribe({
      next: (resp) => {
        console.log(resp);
        if(resp.codigoRespuesta == '00' && !resp.hasData){
          $('#modalAvisoFaltaDatos').modal('show')
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete listarEmpresaPorUsuario()');
      },
    });
  }

  cargarEmpleos() {
    this.bol_LoadingEmpleos = true;
    this.empresaService.listarEmpleosPorUsuario(this.vIdUsuario).subscribe({
      next: (resp) => {
        console.log(resp);
        this.bol_LoadingEmpleos = false;
        resp.data.forEach((element) => {
          this.arrEmpleos.push({
            id: element.id_job_description,
            descripcion: element.req_qualifications,
            titulo: element.job_title,
            modalidad: 'remoto',
            img: element.company,
            funciones: element.key_responsabilities.split('.'),
            conocimientos: element.techskill_tool.split('.'),
          });
        });
      },
      error: (err) => {
        console.log(err);
        this.bol_LoadingEmpleos = false;
      },
      complete: () => {
        console.log('complete listarEmpleosPorUsuario()');
      },
    });
  }

  irNuevoEmpleo() {
    this.router.navigate(['/manager/publicar-editar']);
  }

  verDetalle(empleo: IListaEmpleos) {
    this.bol_detalle = true;
    this.empleoDetalle = empleo;
    // console.log('desde mg empleo ===>', empleo);
  }
}
