import { Component,Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-menu-config',
  templateUrl: './menu-config.component.html',
  styleUrls: ['./menu-config.component.scss']
})
export class MenuConfigComponent {

  @Output() statePerfil = new EventEmitter<boolean>();
  @Output() statePwd = new EventEmitter<boolean>();

  irPerfil(){   

    this.statePerfil.emit(true);
    this.statePwd.emit(false);
  }

  irPwd(){
    this.statePerfil.emit(false);
    this.statePwd.emit(true);
  }


}
