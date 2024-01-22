import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionMgComponent } from './configuracion-mg.component';

describe('ConfiguracionMgComponent', () => {
  let component: ConfiguracionMgComponent;
  let fixture: ComponentFixture<ConfiguracionMgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionMgComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
