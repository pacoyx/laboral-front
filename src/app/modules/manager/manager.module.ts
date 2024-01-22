import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { LandingManagerComponent } from './pages/landing-manager/landing-manager.component';
import { NavbreadManagerComponent } from './components/navbread-manager/navbread-manager.component';
import { ConfiguracionMgComponent } from './pages/configuracion-mg/configuracion-mg.component';
import { EmpleosMgComponent } from './pages/empleos-mg/empleos-mg.component';
import { ChatMgComponent } from './pages/chat-mg/chat-mg.component';
import { PublicarEmpleoMgComponent } from './pages/publicar-empleo-mg/publicar-empleo-mg.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingManagerComponent,
    NavbreadManagerComponent,
    ConfiguracionMgComponent,
    EmpleosMgComponent,
    ChatMgComponent,
    PublicarEmpleoMgComponent,    
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManagerModule { }
