import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

const basic_auth_header = "Basic ZWlja2U6Z2VoZWlt";

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
         return this.http.post('http://localhost:8081/auth/oauth/token', undefined, {
          params: new HttpParams().set('grant_type','password').set('username', username).set('password',password),
          headers: new HttpHeaders().set('Authorization', basic_auth_header )
        }).map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token : string;
                response.json().then((token) => this.token = token );
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
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
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}` +
          `message was: ${error.message}`);
      }
      // return an ErrorObservable with a user-facing error message
      return new ErrorObservable(
        'Wrong credentials.');
    };

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
