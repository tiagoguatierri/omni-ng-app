import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export type Result<T> = {
  results: T[];
};

export type QueryParams = {
  limit: number;
  where?: any;
};

export const url = (path?: string) =>
  path ? `${environment.serverUrl}/${path}` : environment.serverUrl;

export const resolvePath = (className: string, params?: any) => {
  const path = url(`classes/${className}`);
  return params ? `${path}/${params}` : path;
};

/**
 * Refactpry
 * Create a intercept service to handle authorization headers..
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly parseStorageUserKey = `Parse/${environment.applicationId}/currentUser`;

  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': environment.applicationId,
    'x-omnichat-platform': environment.platform,
  });

  constructor(private http: HttpClient) {}

  private getLocalStorageSessionToken(): string | null {
    const userStorage = localStorage.getItem(this.parseStorageUserKey);

    return userStorage ? JSON.parse(userStorage).sessionToken : null;
  }

  private getHeaders(token = this.getLocalStorageSessionToken()): HttpHeaders {
    return token
      ? this.defaultHeaders.set('X-Parse-Session-Token', token)
      : this.defaultHeaders;
  }

  public get<T>(
    path: string,
    query: Partial<QueryParams> = {}
  ): Observable<T[]> {
    const headers = this.getHeaders();

    if (query.where) {
      query.where = JSON.stringify(query.where);
    }

    const params = new HttpParams({
      fromObject: {
        ...query,
      },
    });

    return this.http
      .get<Result<T>>(path, {
        headers,
        params,
      })
      .pipe(map((response) => response.results));
  }

  public post<T>(path: string, body: T): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(path, body, { headers });
  }

  public put<T>(path: string, partial: Partial<T>): Observable<T> {
    const headers = this.getHeaders();
    return this.http.put<T>(path, partial, {
      headers,
    });
  }

  public delete<T>(path: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.delete<T>(path, { headers });
  }
}
