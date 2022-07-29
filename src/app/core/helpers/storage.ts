export function setStorageObject(key: string, value: Object) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getStorageObject(key: string): Object | null {
  return window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key)!)
    : null;
}
