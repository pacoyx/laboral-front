import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-manager',
  templateUrl: './landing-manager.component.html',
  styleUrls: ['./landing-manager.component.scss'],
})
export class LandingManagerComponent implements OnInit {
  private router = inject(Router);
  vEmpleador = '';
  vCorreo = '';
  vCelular = '';

  frmDatos: FormGroup;
  bol_loading=false;
  
  constructor(){
    this.frmDatos = new FormGroup({      
      nombreEmpresa: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required)
    });
  }

  get nombreEmpresa() { return this.frmDatos.get('nombreEmpresa'); }
  get ubicacion() { return this.frmDatos.get('ubicacion'); }
  get url() { return this.frmDatos.get('url'); }

  ngOnInit(): void {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    console.log('===>', objLogin);
    this.vEmpleador = objLogin.user.nombres_completo;
    this.vCorreo = objLogin.user.correo_corporativo;
    this.vCelular = objLogin.user.celular;
  }

  irConfiguracion() {
    this.router.navigate(['/manager/configuracion']);
  }

  abrirModalDatosEmp(){
    console.log('abriendso midal');
    
  }
}
