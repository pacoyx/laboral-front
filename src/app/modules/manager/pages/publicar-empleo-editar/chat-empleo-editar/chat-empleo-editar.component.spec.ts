import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEmpleoEditarComponent } from './chat-empleo-editar.component';

describe('ChatEmpleoEditarComponent', () => {
  let component: ChatEmpleoEditarComponent;
  let fixture: ComponentFixture<ChatEmpleoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatEmpleoEditarComponent]
    });
    fixture = TestBed.createComponent(ChatEmpleoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
