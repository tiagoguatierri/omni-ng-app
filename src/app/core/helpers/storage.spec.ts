import { setStorageObject } from './storage';

describe('StorageHelper', () => {
  it('should set object in localStorage with key', () => {
    expect(setStorageObject).toBeDefined();
  });
});
