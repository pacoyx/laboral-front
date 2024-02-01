import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleoCandidatosComponent } from './empleo-candidatos.component';

describe('EmpleoCandidatosComponent', () => {
  let component: EmpleoCandidatosComponent;
  let fixture: ComponentFixture<EmpleoCandidatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleoCandidatosComponent]
    });
    fixture = TestBed.createComponent(EmpleoCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
