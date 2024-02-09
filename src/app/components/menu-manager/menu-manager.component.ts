import { Component, OnInit, inject } from '@angular/core';
import { EventMediatorService } from 'src/app/modules/manager/services/event-mediator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {
  private eventMediator = inject(EventMediatorService);
  pathImgAvatar = '';
  nombreUsuario = '';
  icono = '';

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.nombreUsuario = objLogin.user.user_name;
    this.icono = objLogin.user.icono || '';        
    // this.pathImgAvatar = environment.epImagesPublic + '/' + this.icono;

    this.pathImgAvatar =
      objLogin.tipo == 'sistema'
        ? environment.epImagesPublic + '/' + this.icono
        : this.icono;

    this.eventMediator
    .avatarChanged
    .subscribe((avatarData) => {
      if(avatarData){
        if(avatarData.icono != ''){
          this.icono = avatarData.icono;        
          this.pathImgAvatar = environment.epImagesPublic + '/' + avatarData.icono;
        }                
        this.nombreUsuario = avatarData.nombreUsuario;
      }
    });
  }




}
