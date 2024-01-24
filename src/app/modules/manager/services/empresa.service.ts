import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReqRegEmpresa } from '../interfaces/IReqRegEmpresa';
import { IResRegEmpresa } from '../interfaces/IResRegEmpresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private epRaiz = environment.epRaiz;
  private epRegEmpresa = environment.epRegistroEmpresa;
  private http = inject(HttpClient);

  constructor() {}

  registrarEmpresa(req: FormData) {
    return this.http.post<IResRegEmpresa>(this.epRaiz + this.epRegEmpresa, req);
  }
}
