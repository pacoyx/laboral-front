import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMgComponent } from './perfil-mg.component';

describe('PerfilMgComponent', () => {
  let component: PerfilMgComponent;
  let fixture: ComponentFixture<PerfilMgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilMgComponent]
    });
    fixture = TestBed.createComponent(PerfilMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
