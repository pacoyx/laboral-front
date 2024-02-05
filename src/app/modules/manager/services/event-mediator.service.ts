import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAvatarData } from 'src/app/interfaces/IAvatarData';

@Injectable({
  providedIn: 'root'
})
export class EventMediatorService {

  constructor() { }

  // reclutador changed event
  private avatarChangedSubject$ = new BehaviorSubject<IAvatarData | null>(null);
  public avatarChanged = this.avatarChangedSubject$.asObservable();

  public notifyOnAvatarChanged(avatarData: IAvatarData): void {
      this.avatarChangedSubject$.next(avatarData);
  }


}
