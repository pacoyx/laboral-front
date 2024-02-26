import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosInfoComponent } from './empleos-info.component';

describe('EmpleosInfoComponent', () => {
  let component: EmpleosInfoComponent;
  let fixture: ComponentFixture<EmpleosInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleosInfoComponent]
    });
    fixture = TestBed.createComponent(EmpleosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
