import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { LandingManagerComponent } from './pages/landing-manager/landing-manager.component';

@NgModule({
  declarations: [
    LandingManagerComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
