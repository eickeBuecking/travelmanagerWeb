import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}
  private user: User;
  login(username, password): void {

    this.http.post('https://localhost:8081/oauth/token', undefined, {
      params: new HttpParams().set('grant_type','password').set('user', username).set('password',password)
    })
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => {localStorage.setItem('access_token', data.access_token)},
        error => {console.log(error), Observable.throw(error)}
      );
  }
}
