import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarEmpleoMgComponent } from './publicar-empleo-mg.component';

describe('PublicarEmpleoMgComponent', () => {
  let component: PublicarEmpleoMgComponent;
  let fixture: ComponentFixture<PublicarEmpleoMgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarEmpleoMgComponent]
    });
    fixture = TestBed.createComponent(PublicarEmpleoMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
