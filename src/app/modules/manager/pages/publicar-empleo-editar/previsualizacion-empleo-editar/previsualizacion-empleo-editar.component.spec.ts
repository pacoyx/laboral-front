import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizacionEmpleoEditarComponent } from './previsualizacion-empleo-editar.component';

describe('PrevisualizacionEmpleoEditarComponent', () => {
  let component: PrevisualizacionEmpleoEditarComponent;
  let fixture: ComponentFixture<PrevisualizacionEmpleoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrevisualizacionEmpleoEditarComponent]
    });
    fixture = TestBed.createComponent(PrevisualizacionEmpleoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
