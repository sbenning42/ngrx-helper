import { TestBed, inject } from '@angular/core/testing';

import { AppHeaderControllerService } from './app-header-controller.service';

describe('AppHeaderControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppHeaderControllerService]
    });
  });

  it('should be created', inject([AppHeaderControllerService], (service: AppHeaderControllerService) => {
    expect(service).toBeTruthy();
  }));
});
