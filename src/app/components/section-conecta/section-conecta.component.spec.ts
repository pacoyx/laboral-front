import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionConectaComponent } from './section-conecta.component';

describe('SectionConectaComponent', () => {
  let component: SectionConectaComponent;
  let fixture: ComponentFixture<SectionConectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionConectaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionConectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
