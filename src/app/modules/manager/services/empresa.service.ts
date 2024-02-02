import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReqRegEmpresa } from '../interfaces/IReqRegEmpresa';
import { IResRegEmpresa } from '../interfaces/IResRegEmpresa';
import { IResListarEmpPorUsu } from '../interfaces/IResListarEmpPorUsu';
import { IReqRegEmpleo } from '../interfaces/IReqRegEmpleo';
import { IResRegEmpleo } from '../interfaces/IResRegEmpleo';
import { IResListarEmpleosPorUsu } from '../interfaces/IResListarEmpleosPorUsu';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private epRaiz = environment.epRaiz;
  private epRegEmpresa = environment.epRegistroEmpresa;
  private epListarEmpPorUsu = environment.epListarEmpPorUsu;
  private epListarEmpleosPorUsu = environment.epListarEmpleosPorUsu;
  private epRegEmpleo = environment.epRegistrarEmpleo;
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

  registrarEmpleo(req: IReqRegEmpleo) {
    return this.http.post<IResRegEmpleo>(this.epRaiz + this.epRegEmpleo, req);
  }

  listarEmpleosPorUsuario(idUsuario: number) {
    const req: any = {
      idUser: idUsuario,
    };
    return this.http.post<IResListarEmpleosPorUsu>(
      this.epRaiz + this.epListarEmpleosPorUsu,
      req
    );
  }

}
