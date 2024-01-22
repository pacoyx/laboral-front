import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCreadoMsgComponent } from './usuario-creado-msg.component';

describe('UsuarioCreadoMsgComponent', () => {
  let component: UsuarioCreadoMsgComponent;
  let fixture: ComponentFixture<UsuarioCreadoMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioCreadoMsgComponent]
    });
    fixture = TestBed.createComponent(UsuarioCreadoMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
