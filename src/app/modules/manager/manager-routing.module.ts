import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutManagerComponent } from 'src/app/layouts/layout-manager/layout-manager.component';
import { LandingManagerComponent } from './pages/landing-manager/landing-manager.component';
import { PublicarEmpleoMgComponent } from './pages/publicar-empleo-mg/publicar-empleo-mg.component';
import { ChatMgComponent } from './pages/chat-mg/chat-mg.component';
import { EmpleosMgComponent } from './pages/empleos-mg/empleos-mg.component';
import { ConfiguracionMgComponent } from './pages/configuracion-mg/configuracion-mg.component';
import { PerfilMgComponent } from './pages/perfil-mg/perfil-mg.component';
import { PublicarEmpleoEditarComponent } from './pages/publicar-empleo-editar/publicar-empleo-editar.component';
import { EmpleoCandidatosComponent } from './pages/empleo-candidatos/empleo-candidatos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutManagerComponent,
    children: [
      { path: '', component: LandingManagerComponent },
      { path: 'dashboard', component: LandingManagerComponent },
      { path: 'publicar', component: PublicarEmpleoMgComponent },
      { path: 'publicar-editar', component: PublicarEmpleoEditarComponent },
      { path: 'chat', component: ChatMgComponent },
      { path: 'empleos', component: EmpleosMgComponent },
      { path: 'candidatos', component: EmpleoCandidatosComponent },
      { path: 'configuracion', component: ConfiguracionMgComponent },
      { path: 'perfil', component: PerfilMgComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
