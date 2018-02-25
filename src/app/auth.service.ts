import { Injectable } from '@angular/core';
  import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

const basic_auth_header = "Basic ZWlja2U6Z2VoZWlt";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}
  private user: User;
  login(username, password): User {

    let res = this.http.post('http://localhost:8081/auth/oauth/token', undefined, {
      params: new HttpParams().set('grant_type','password').set('username', username).set('password',password),
      headers: new HttpHeaders().set('Authorization', basic_auth_header )
    })

      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => {localStorage.setItem('access_token', data['access_token'])},
        error => {console.log(error), Observable.throw(error)}
      );
      console.log(res);
      let user: User = new User(0, "Klaus", "Meier");
      return user;
  }
}
