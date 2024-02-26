import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { LayoutPublicComponent } from './layouts/layout-public/layout-public.component';
import { UsuarioCreadoMsgComponent } from './pages/usuario-creado-msg/usuario-creado-msg.component';
import { UsuarioCreadoValidacionComponent } from './pages/usuario-creado-validacion/usuario-creado-validacion.component';
import { ValidateLoginComponent } from './pages/validate-login/validate-login.component';
import { EmpleosInfoComponent } from './pages/empleos-info/empleos-info.component';
import { authGuard } from './Services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'register',
    component: UsuarioCreadoMsgComponent,
  },
  {
    path: 'validate/:token',
    component: UsuarioCreadoValidacionComponent,
  },
  {
    path: 'validatelogin',
    component: ValidateLoginComponent,
  },
  {
    path: 'manager',
    canActivate:[authGuard],
    loadChildren: () =>
      import('./modules/manager/manager.module').then((m) => m.ManagerModule),
  },
  {
    path: 'home',
    component: LandingHomeComponent,
  },
  {
    path: 'empleos/:token',
    component: EmpleosInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
