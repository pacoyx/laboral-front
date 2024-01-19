import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private epRaiz = environment.epRaiz;
  private epLogin = environment.epLogin;
  private epRegUsuario = environment.epRegistrarUsuario;

  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post(this.epRaiz + this.epLogin, body);
  }

  registrarUsuario(body: any) {
    return this.http.post(this.epRaiz + this.epRegUsuario, body);
  }

}
