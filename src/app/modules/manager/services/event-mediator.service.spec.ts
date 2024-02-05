import { TestBed } from '@angular/core/testing';

import { EventMediatorService } from './event-mediator.service';

describe('EventMediatorService', () => {
  let service: EventMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
