import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { LayoutManagerComponent } from './layouts/layout-manager/layout-manager.component';
import { LayoutPublicComponent } from './layouts/layout-public/layout-public.component';
import { MenuPublicComponent } from './components/menu-public/menu-public.component';
import { SectionConectaComponent } from './components/section-conecta/section-conecta.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { MenuManagerComponent } from './components/menu-manager/menu-manager.component';
import { SidebarManagerComponent } from './components/sidebar-manager/sidebar-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingHomeComponent,
    LayoutManagerComponent,
    LayoutPublicComponent,
    MenuPublicComponent,
    SectionConectaComponent,
    RegistroUsuarioComponent,
    LoginUsuarioComponent,
    MenuManagerComponent,
    SidebarManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
