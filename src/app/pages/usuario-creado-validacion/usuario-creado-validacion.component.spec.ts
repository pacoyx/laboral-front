import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCreadoValidacionComponent } from './usuario-creado-validacion.component';

describe('UsuarioCreadoValidacionComponent', () => {
  let component: UsuarioCreadoValidacionComponent;
  let fixture: ComponentFixture<UsuarioCreadoValidacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioCreadoValidacionComponent]
    });
    fixture = TestBed.createComponent(UsuarioCreadoValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
