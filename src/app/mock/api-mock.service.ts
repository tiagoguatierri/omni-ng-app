import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiMockService {
  public get<T>(): Observable<T[]> {
    return of([]);
  }
  public post<T>(): Observable<T> {
    return of({} as any);
  }
  public put<T>(): Observable<T> {
    return of({} as any);
  }
  public delete<T>(): Observable<T> {
    return of({} as any);
  }
}
