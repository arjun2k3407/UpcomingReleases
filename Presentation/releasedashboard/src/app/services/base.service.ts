import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .append('Access-Control-Allow-Origin', '*')
    .append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    .append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
};

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private headers = new Headers();

  constructor(
    private http: HttpClient
  ) { }

  async getToService(endpoint: string): Promise<any> {
    return await this.http.get(endpoint)
      .toPromise()
      .then((resp: Response) => resp.json())
      .catch(this.handleException);
  }

  getServiceObservable(endpoint: string): Observable<any> {
    return this.http.get(endpoint, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postServiceObservable(endpoint: string, request: string): Observable<any> {
    return this.http.post(endpoint, request, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  putServiceObservable(endpoint: string, request: string): Observable<any> {
    return this.http.put(endpoint, request, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteServiceObservable(endpoint: string): Observable<any> {
    return this.http.delete(endpoint, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  private handleException(error: Response): Promise<any> {
    return Promise.reject(error);
  }
}
