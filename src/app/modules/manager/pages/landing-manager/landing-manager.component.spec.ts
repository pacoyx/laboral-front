import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingManagerComponent } from './landing-manager.component';

describe('LandingManagerComponent', () => {
  let component: LandingManagerComponent;
  let fixture: ComponentFixture<LandingManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
