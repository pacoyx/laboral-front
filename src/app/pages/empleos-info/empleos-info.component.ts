import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/Services/general.service';
import { IResEmpleoByIdData } from 'src/app/interfaces/IResEmpleoById';

@Component({
  selector: 'app-empleos-info',
  templateUrl: './empleos-info.component.html',
  styleUrls: ['./empleos-info.component.scss'],
})
export class EmpleosInfoComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private generalService = inject(GeneralService);
  jobId = '';
  subscriptionlistarEmpleoPorId!: Subscription;
  empleo!:IResEmpleoByIdData;
  bol_loading=false;

  constructor() {
    this.jobId = this.activatedRoute.snapshot.params['token'];
    console.log('id job::', this.jobId);
  }
  ngOnInit(): void {
    const req: any = {
      idJob: this.jobId,
    };
    this.bol_loading = true;
    this.subscriptionlistarEmpleoPorId = this.generalService
      .listarEmpleoPorId(req)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.empleo = resp.data;          
          this.bol_loading = false;
        },
        error: (err) => {
          console.log(err);
          this.bol_loading = false;
        },
        complete: () => {
          console.log('Complete listarEmpleoPorId()');
        },
      });
  }
}
