import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosMgComponent } from './empleos-mg.component';

describe('EmpleosMgComponent', () => {
  let component: EmpleosMgComponent;
  let fixture: ComponentFixture<EmpleosMgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleosMgComponent]
    });
    fixture = TestBed.createComponent(EmpleosMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
