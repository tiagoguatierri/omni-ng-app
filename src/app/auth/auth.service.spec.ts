import { ApiMockService } from '../mock/api-mock.service';
import {
  SpectatorService,
  SpyObject,
  createServiceFactory,
} from '@ngneat/spectator';
import { ApiService } from '../core/services/api.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  let service: AuthService;
  let mock: SpyObject<ApiMockService>;

  const createService = createServiceFactory({
    imports: [HttpClientTestingModule],
    service: AuthService,
    mocks: [ApiMockService],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    mock = spectator.inject(ApiMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setAuthStorage()', () => {
    it('should set auth info in localStorage', () => {
      expect(service.setAuthStorage).toBeDefined();
    });
  });

  describe('#getAuthStorage()', () => {
    it('should return auth info from localStorage', () => {
      expect(service.setAuthStorage).toBeDefined();
    });
  });
});
