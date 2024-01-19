import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent {

  constructor(private router:Router){

  }

  login(){
    this.router.navigateByUrl('/manager');
  }

}
