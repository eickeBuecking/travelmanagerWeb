import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { TravelListItem } from './models/travellistitem';

@Injectable()
export class TravelsService {

  constructor(private authenticationService: AuthenticationService,  private http: HttpClient) { }

  getTravels() : Observable<TravelListItem[]> {
    return this.http.get<TravelListItem[]>("http://localhost:9020/travelmanager/travels", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.authenticationService.token )
    }).pipe(
      catchError(this.handleError)
    );


}

private handleError(error: HttpErrorResponse) {
console.error('Raw error: ', error);
if (error instanceof ErrorEvent) {
  // A client-side or network error occurred. Handle it accordingly.
  console.error('An error occurred:', error.message);
} else {

  console.error(
    `Backend returned code ${error.status}, ` +
    `body was: ${error.error}` +
    `message was: ${error.message}`);
}
  // return an ErrorObservable with a user-facing error message
  return new ErrorObservable(
    'Loading of Travels failed!');
  };

}
