import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion-mg',
  templateUrl: './configuracion-mg.component.html',
  styleUrls: ['./configuracion-mg.component.scss'],
})
export class ConfiguracionMgComponent {
  showPerfil = false;
  showPwd = false;

  constructor() {}

  ngOnInit(): void {
    this.showPerfil = true;
  }
}
