import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-manager',
  templateUrl: './sidebar-manager.component.html',
  styleUrls: ['./sidebar-manager.component.scss']
})
export class SidebarManagerComponent {
  public sidebarShow: boolean = false;
}
