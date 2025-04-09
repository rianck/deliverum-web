import { TestBed } from '@angular/core/testing';

import { SegmentFormService } from './segment-form.service';

describe('SegmentFormService', () => {
  let service: SegmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegmentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
