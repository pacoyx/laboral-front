import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPwdComponent } from './cambiar-pwd.component';

describe('CambiarPwdComponent', () => {
  let component: CambiarPwdComponent;
  let fixture: ComponentFixture<CambiarPwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarPwdComponent]
    });
    fixture = TestBed.createComponent(CambiarPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
