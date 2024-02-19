import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoRespuestasComponent } from './candidato-respuestas.component';

describe('CandidatoRespuestasComponent', () => {
  let component: CandidatoRespuestasComponent;
  let fixture: ComponentFixture<CandidatoRespuestasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatoRespuestasComponent]
    });
    fixture = TestBed.createComponent(CandidatoRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
