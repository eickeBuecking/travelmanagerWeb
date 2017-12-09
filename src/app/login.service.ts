import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class LoginService {

  constructor() { }

   login(name: string, password:string): Observable<User> {
    if (name && name.length>0 && password && password.length>0) {
      if (name=="klaus") {
        let myUser = new User(1,"Klaus","Meier");
        return of(myUser);
      } else {
        let error = new Error("Wrong user name or password!");
        return Observable.throw(error);
      }
    } else {
      let error = new Error("You entered an invalid password");
      return Observable.throw(error);
    }
  }


}
