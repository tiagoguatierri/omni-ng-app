import {
  HttpMethod,
  SpectatorHttp,
  createHttpFactory,
} from '@ngneat/spectator';
import { ApiService, resolvePath } from './api.service';

describe('ApiService', () => {
  let spectator: SpectatorHttp<ApiService>;
  let service: ApiService;

  const createHttp = createHttpFactory(ApiService);
  const className = 'test';
  const path = resolvePath(className);

  beforeEach(() => {
    spectator = createHttp();
    service = spectator.service;
  });

  describe('#get()', () => {
    it('should fetch api', async () => {
      spectator.service.get(path).subscribe();
      spectator.expectOne(path, HttpMethod.GET);
    });
  });

  describe('#post()', () => {
    const body = { prop: 'prop' };
    it('should create a resource', () => {
      spectator.service.post(path, body).subscribe();

      const req = spectator.expectOne(path, HttpMethod.POST);
      expect(req.request.body).toEqual(body);
    });
  });

  describe('#put()', () => {
    const body = { prop: 'prop' };
    const objectId = 'id';
    it('should update a resource by id', () => {
      spectator.service.put(path + `/${objectId}`, body).subscribe();
      spectator.expectOne(path + `/${objectId}`, HttpMethod.PUT);
    });
  });

  describe('#delete()', () => {
    const objectId = 'id';
    it('should delete a resource by id', () => {
      spectator.service.delete(path + `/${objectId}`).subscribe();
      spectator.expectOne(path + `/${objectId}`, HttpMethod.DELETE);
    });
  });
});
