import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {

  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially be not loading', () => {
    let loadingValue = false;
    service.loading$.subscribe(value => loadingValue = value);
    expect(loadingValue).toBeFalse();
  });

  it('should set loading to true when loadingOn() is called', () => {
    let loadingValue = false;
    service.loading$.subscribe(value => loadingValue = value);
  
    service.loadingOn();
  
    expect(loadingValue).toBeTrue();
  });

  it('should set loading to false when loadingOff() is called', () => {
    let loadingValue = true;
    service.loading$.subscribe(value => loadingValue = value);
  
    service.loadingOn();
    service.loadingOff();
  
    expect(loadingValue).toBeFalse();
  });

});
