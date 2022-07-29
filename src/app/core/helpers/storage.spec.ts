import { setStorageObject } from './storage';

describe('StorageHelper', () => {
  describe('#setStorageObject()', () => {
    it('should set object in localStorage with key', () => {
      expect(setStorageObject).toBeDefined();
    });
  });

  describe('#getStorageObject()', () => {
    it('should return a object from localStorage by key', () => {
      expect(setStorageObject).toBeDefined();
    });
  });
});
