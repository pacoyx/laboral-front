import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { LandingManagerComponent } from './pages/landing-manager/landing-manager.component';
import { NavbreadManagerComponent } from './components/navbread-manager/navbread-manager.component';
import { ConfiguracionMgComponent } from './pages/configuracion-mg/configuracion-mg.component';
import { EmpleosMgComponent } from './pages/empleos-mg/empleos-mg.component';
import { ChatMgComponent } from './pages/chat-mg/chat-mg.component';
import { PublicarEmpleoMgComponent } from './pages/publicar-empleo-mg/publicar-empleo-mg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilMgComponent } from './pages/perfil-mg/perfil-mg.component';
import { CambiarPwdComponent } from './pages/configuracion-mg/cambiar-pwd/cambiar-pwd.component';
import { CambiarPerfilComponent } from './pages/configuracion-mg/cambiar-perfil/cambiar-perfil.component';
import { MenuConfigComponent } from './pages/configuracion-mg/menu-config/menu-config.component';
import { NavConfigComponent } from './pages/configuracion-mg/nav-config/nav-config.component';
import { PublicarEmpleoEditarComponent } from './pages/publicar-empleo-editar/publicar-empleo-editar.component';
import { ChatEmpleoEditarComponent } from './pages/publicar-empleo-editar/chat-empleo-editar/chat-empleo-editar.component';
import { PrevisualizacionEmpleoEditarComponent } from './pages/publicar-empleo-editar/previsualizacion-empleo-editar/previsualizacion-empleo-editar.component';

@NgModule({
  declarations: [
    LandingManagerComponent,
    NavbreadManagerComponent,
    ConfiguracionMgComponent,
    EmpleosMgComponent,
    ChatMgComponent,
    PublicarEmpleoMgComponent,
    PerfilMgComponent,
    CambiarPwdComponent,
    CambiarPerfilComponent,
    MenuConfigComponent,
    NavConfigComponent,
    PublicarEmpleoEditarComponent,
    ChatEmpleoEditarComponent,
    PrevisualizacionEmpleoEditarComponent,    
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ManagerModule { }
