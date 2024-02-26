import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IResEmpleoById } from '../interfaces/IResEmpleoById';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private epRaiz = environment.epRaiz;
  private epListarEmpleoPorId = environment.epListarEmpleoPorId;

  constructor(private http: HttpClient) {}

  listarEmpleoPorId(body: any) {    
    return this.http.post<IResEmpleoById>(this.epRaiz + this.epListarEmpleoPorId, body);
  }
}
