import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService, url } from '../core/services/api.service';

import { getStorageObject, setStorageObject } from '../core/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly parseStorageUserKey = `Parse/${environment.applicationId}/currentUser`;

  constructor(private api: ApiService) {}

  public setAuthStorage(value: any): void {
    setStorageObject(this.parseStorageUserKey, value);
  }

  public getAuthStorage(): Object | null {
    return getStorageObject(this.parseStorageUserKey);
  }

  public login(username: string, password: string): Observable<any> {
    this.setAuthStorage({});
    
    return this.api
      .post(
        url('functions/login'),
        JSON.stringify({
          username,
          password,
        })
      )
      .pipe(
        tap((data: any) => {
          this.setAuthStorage(data.result);
        })
      );
  }
}
