import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventMediatorService } from '../../../services/event-mediator.service';

@Component({
  selector: 'app-menu-config',
  templateUrl: './menu-config.component.html',
  styleUrls: ['./menu-config.component.scss'],
})
export class MenuConfigComponent implements OnInit {
  private eventMediator = inject(EventMediatorService);
  @Output() statePerfil = new EventEmitter<boolean>();
  @Output() statePwd = new EventEmitter<boolean>();
  pathImgAvatar = '';
  nombreUsuario = '';
  icono = '';
  vTipoLogin='';

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.nombreUsuario = objLogin.user.user_name;
    this.icono = objLogin.user.icono || '';
    this.pathImgAvatar = objLogin.tipo == 'sistema' ? environment.epImagesPublic + '/' + this.icono : this.icono ;
    this.vTipoLogin = objLogin.tipo;

    this.eventMediator.avatarChanged.subscribe((avatarData) => {
      if (avatarData) {
        console.log('desde menu entro el mediator');
        if(avatarData.icono != ''){
          this.icono = avatarData.icono;        
          this.pathImgAvatar = environment.epImagesPublic + '/' + avatarData.icono;
        }        
        this.nombreUsuario = avatarData.nombreUsuario;
      }
    });
  }

  irPerfil() {
    this.statePerfil.emit(true);
    this.statePwd.emit(false);
  }

  irPwd() {
    this.statePerfil.emit(false);
    this.statePwd.emit(true);
  }
}
