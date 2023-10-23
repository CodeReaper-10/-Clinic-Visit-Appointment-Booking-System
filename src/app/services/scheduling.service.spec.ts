import { TestBed } from '@angular/core/testing';

import { SchedulingService } from './scheduling.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SchedulingService', () => {
  let service: SchedulingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(SchedulingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});