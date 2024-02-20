import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAvatarData } from 'src/app/interfaces/IAvatarData';
import { ICompanyData } from 'src/app/interfaces/ICompanyData';
import { IResListarEmpleosOpenCloseDet } from '../interfaces/IResListarEmpleosOpenClose';
import { IResListarCandiPorEmpleoDet } from '../interfaces/IResListarCandiPorEmpleo';

@Injectable({
  providedIn: 'root',
})
export class EventMediatorService {
  constructor() {}

  // reclutador changed event
  private avatarChangedSubject$ = new BehaviorSubject<IAvatarData | null>(null);
  public avatarChanged = this.avatarChangedSubject$.asObservable();

  public notifyOnAvatarChanged(avatarData: IAvatarData): void {
    this.avatarChangedSubject$.next(avatarData);
  }

  // company changed event
  private companyChangedSubject$ = new BehaviorSubject<ICompanyData | null>(null);
  public companyChanged = this.companyChangedSubject$.asObservable();

  public notifyOnCompanyChanged(companyData: ICompanyData): void {
    this.companyChangedSubject$.next(companyData);
  }

  // empleo changed event
  private empleoChangedSubject$ = new BehaviorSubject<IResListarEmpleosOpenCloseDet | null>(null);
  public empleoChanged = this.empleoChangedSubject$.asObservable();

  public notifyOnEmpleoChanged(empleoData: IResListarEmpleosOpenCloseDet): void {
    this.empleoChangedSubject$.next(empleoData);
  }

  // candidato changed event
  private candidatoChangedSubject$ = new BehaviorSubject<IResListarCandiPorEmpleoDet | null>(null);
  public candidatoChanged = this.candidatoChangedSubject$.asObservable();

  public notifyOnCandidatoChanged(candidatoData: IResListarCandiPorEmpleoDet): void {
    this.candidatoChangedSubject$.next(candidatoData);
  }

}
