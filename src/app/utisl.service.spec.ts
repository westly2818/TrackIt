import { TestBed } from '@angular/core/testing';

import { UtislService } from './utisl.service';

describe('UtislService', () => {
  let service: UtislService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtislService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
