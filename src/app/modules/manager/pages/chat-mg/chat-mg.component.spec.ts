import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMgComponent } from './chat-mg.component';

describe('ChatMgComponent', () => {
  let component: ChatMgComponent;
  let fixture: ComponentFixture<ChatMgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMgComponent]
    });
    fixture = TestBed.createComponent(ChatMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
