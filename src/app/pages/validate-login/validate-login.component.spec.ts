import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateLoginComponent } from './validate-login.component';

describe('ValidateLoginComponent', () => {
  let component: ValidateLoginComponent;
  let fixture: ComponentFixture<ValidateLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateLoginComponent]
    });
    fixture = TestBed.createComponent(ValidateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
