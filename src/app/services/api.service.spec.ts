import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { APP_CONFIG } from '../../config';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_CONFIG, useValue: APP_CONFIG },
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
