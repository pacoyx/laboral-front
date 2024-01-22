import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-manager',
  templateUrl: './sidebar-manager.component.html',
  styleUrls: ['./sidebar-manager.component.scss'],
})
export class SidebarManagerComponent {
  public sidebarShow: boolean = false;

  constructor(private router:Router){

  }
  cerrarSesion() {
    let dataUser: any = localStorage.getItem('laboral.ai');
    dataUser = JSON.parse(dataUser!);

    localStorage.removeItem('laboral.ai');
    if (dataUser.recordar == 0) {
      localStorage.removeItem('laboral.ai.check');
    }

    this.router.navigate(['/home']);

  }
}
