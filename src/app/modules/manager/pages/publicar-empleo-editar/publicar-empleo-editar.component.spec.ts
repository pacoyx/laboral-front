import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarEmpleoEditarComponent } from './publicar-empleo-editar.component';

describe('PublicarEmpleoEditarComponent', () => {
  let component: PublicarEmpleoEditarComponent;
  let fixture: ComponentFixture<PublicarEmpleoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarEmpleoEditarComponent]
    });
    fixture = TestBed.createComponent(PublicarEmpleoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
