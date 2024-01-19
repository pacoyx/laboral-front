import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutManagerComponent } from 'src/app/layouts/layout-manager/layout-manager.component';
import { LandingManagerComponent } from './pages/landing-manager/landing-manager.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutManagerComponent,
    children: [{ path: '', component: LandingManagerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
