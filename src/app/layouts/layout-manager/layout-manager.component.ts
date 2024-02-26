import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/Services/auth-google.service';


@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.scss']
})
export class LayoutManagerComponent {
  private authGoogleService = inject(AuthGoogleService);
  private router = inject(Router);
  open=true;
logout(){
  this.authGoogleService.logout();
  this.router.navigate(['/home']);
  localStorage.clear();
}

toggle(){
  this.open = !this.open;
}

}
