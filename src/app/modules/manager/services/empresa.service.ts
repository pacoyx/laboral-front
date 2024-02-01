import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReqRegEmpresa } from '../interfaces/IReqRegEmpresa';
import { IResRegEmpresa } from '../interfaces/IResRegEmpresa';
import { IResListarEmpPorUsu } from '../interfaces/IResListarEmpPorUsu';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private epRaiz = environment.epRaiz;
  private epRegEmpresa = environment.epRegistroEmpresa;
  private epListarEmpPorUsu = environment.epListarEmpPorUsu;
  private http = inject(HttpClient);

  constructor() {}

  registrarEmpresa(req: FormData) {
    return this.http.post<IResRegEmpresa>(this.epRaiz + this.epRegEmpresa, req);
  }

  listarEmpresaPorUsuario(idUsuario: number) {
    const req: any = {
      idUser: idUsuario,
    };
    return this.http.post<IResListarEmpPorUsu>(
      this.epRaiz + this.epListarEmpPorUsu,
      req
    );
  }
}
