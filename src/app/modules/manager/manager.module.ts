import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { LandingManagerComponent } from './pages/landing-manager/landing-manager.component';
import { NavbreadManagerComponent } from './components/navbread-manager/navbread-manager.component';

@NgModule({
  declarations: [
    LandingManagerComponent,
    NavbreadManagerComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
