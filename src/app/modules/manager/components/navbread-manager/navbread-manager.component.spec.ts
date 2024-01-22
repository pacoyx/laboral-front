import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbreadManagerComponent } from './navbread-manager.component';

describe('NavbreadManagerComponent', () => {
  let component: NavbreadManagerComponent;
  let fixture: ComponentFixture<NavbreadManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbreadManagerComponent]
    });
    fixture = TestBed.createComponent(NavbreadManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
