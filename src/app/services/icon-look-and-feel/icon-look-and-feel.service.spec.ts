import { TestBed } from '@angular/core/testing';

import { IconLookAndFeelService } from './icon-look-and-feel.service';

describe('IconLookAndFeelService', () => {
  let service: IconLookAndFeelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconLookAndFeelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
