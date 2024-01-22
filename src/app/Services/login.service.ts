import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResLogin } from '../interfaces/IResLogin';
import { IReqLogin } from '../interfaces/IreqLogin';
import { IReqRegUsuario } from '../interfaces/IReqRegUsuario';
import { IResRegUsuario } from '../interfaces/IResRegUsuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private epRaiz = environment.epRaiz;
  private epLogin = environment.epLogin;
  private epRegUsuario = environment.epRegistrarUsuario;
  private epValidarRegistroUsuario = environment.epValidarRegistroUsuario;

  constructor(private http: HttpClient) {}

  login(body: IReqLogin) {
    return this.http.post<IResLogin>(this.epRaiz + this.epLogin, body);
  }

  registrarUsuario(body: IReqRegUsuario) {
    return this.http.post<IResRegUsuario>(this.epRaiz + this.epRegUsuario, body);
  }

  validarRegistroUsuario(body: any) {
    return this.http.post<any>(this.epRaiz + this.epValidarRegistroUsuario, body);
  }

}
