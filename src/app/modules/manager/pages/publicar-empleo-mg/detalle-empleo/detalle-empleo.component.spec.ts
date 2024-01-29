import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpleoComponent } from './detalle-empleo.component';

describe('DetalleEmpleoComponent', () => {
  let component: DetalleEmpleoComponent;
  let fixture: ComponentFixture<DetalleEmpleoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEmpleoComponent]
    });
    fixture = TestBed.createComponent(DetalleEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
