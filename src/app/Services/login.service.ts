import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResLogin } from '../interfaces/IResLogin';
import { IReqLogin } from '../interfaces/IreqLogin';
import { IReqRegUsuario } from '../interfaces/IReqRegUsuario';
import { IResRegUsuario } from '../interfaces/IResRegUsuario';
import { IReqExisteLogin } from '../interfaces/IReqExisteLogin';
import { IResExisteLogin } from '../interfaces/IResExisteLogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private epRaiz = environment.epRaiz;
  private epLogin = environment.epLogin;
  private epRegUsuario = environment.epRegistrarUsuario;
  private epValidarRegistroUsuario = environment.epValidarRegistroUsuario;
  private epValidarExisteUsuario = environment.epValidarExisteUsuario;

  constructor(private http: HttpClient) {}

  login(body: IReqLogin) {
    return this.http.post<IResLogin>(this.epRaiz + this.epLogin, body);
  }

  checkLogin(body: IReqExisteLogin) {
    return this.http.post<IResExisteLogin>(this.epRaiz + this.epValidarExisteUsuario, body);
  }

  registrarUsuario(body: IReqRegUsuario) {
    return this.http.post<IResRegUsuario>(this.epRaiz + this.epRegUsuario, body);
  }

  validarRegistroUsuario(body: any) {
    return this.http.post<any>(this.epRaiz + this.epValidarRegistroUsuario, body);
  }

}
