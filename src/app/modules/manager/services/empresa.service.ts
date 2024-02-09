import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReqRegEmpresa } from '../interfaces/IReqRegEmpresa';
import { IResRegEmpresa } from '../interfaces/IResRegEmpresa';
import { IResListarEmpPorUsu } from '../interfaces/IResListarEmpPorUsu';
import { IReqRegEmpleo } from '../interfaces/IReqRegEmpleo';
import { IResRegEmpleo } from '../interfaces/IResRegEmpleo';
import { IResListarEmpleosPorUsu } from '../interfaces/IResListarEmpleosPorUsu';
import { IReqActDataReclutador } from '../interfaces/IReqActDataReclutador';
import { IResActDataReclutador } from '../interfaces/IResActDataReclutador';
import { IReqListarReclutadorPorId } from '../interfaces/IReqListarReclutadorPorId';
import { IResListarReclutadorPorId } from '../interfaces/IResListarReclutadorPorId';
import { IReqActPwdReclutador } from '../interfaces/IReqActPwdReclutador';
import { IReqListarEmpleosOpenClose } from '../interfaces/IReqListarEmpleosOpenClose';
import { IResListarEmpleosOpenClose } from '../interfaces/IResListarEmpleosOpenClose';
import { IReqEliEmpleosPorIds } from '../interfaces/IReqEliEmpleosPorIds';
import { IResEliEmpleosPorIds } from '../interfaces/IResEliEmpleosPorIds';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private epRaiz = environment.epRaiz;
  private epRegEmpresa = environment.epRegistroEmpresa;
  private epListarEmpPorUsu = environment.epListarEmpPorUsu;
  private epListarEmpleosPorUsu = environment.epListarEmpleosPorUsu;
  private epRegEmpleo = environment.epRegistrarEmpleo;
  private epActDataReclutador = environment.epActualizarReclutador;
  private epListarReclutadorPorId = environment.epListarReclutadorPorId;
  private epActPwdReclutador = environment.epActPwdReclutador;
  private epListarEmpleosOpenClose = environment.epListarEmpleosOpenClose;
  private epEliminarEmpleosPorId = environment.epEliminarEmpleosPorIds;

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

  actualizarReclutador(req: FormData) {
    return this.http.post<IResActDataReclutador>(
      this.epRaiz + this.epActDataReclutador,
      req
    );
  }

  listarReclutadorPorId(req: IReqListarReclutadorPorId) {
    return this.http.post<IResListarReclutadorPorId>(
      this.epRaiz + this.epListarReclutadorPorId,
      req
    );
  }

  actualizarPasswordReclutador(req: IReqActPwdReclutador) {
    return this.http.post<IReqActDataReclutador>(
      this.epRaiz + this.epActPwdReclutador,
      req
    );
  }

  listarEmpleosOpenClose(req: IReqListarEmpleosOpenClose) {
    return this.http.post<IResListarEmpleosOpenClose>(
      this.epRaiz + this.epListarEmpleosOpenClose,
      req
    );
  }

  eliminarEmpleosPorIds(req: IReqEliEmpleosPorIds) {
    return this.http.post<IResEliEmpleosPorIds>(
      this.epRaiz + this.epEliminarEmpleosPorId,
      req
    );
  }

}
