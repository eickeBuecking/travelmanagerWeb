import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login.service';
import { AuthenticationService } from '../authentication.service';
import { slideInDownAnimation } from '../animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ slideInDownAnimation ]
})
export class LoginComponent implements OnInit {
  public user: User;
  submitted = false;
  error: string;
  constructor(private loginService: LoginService, private authService : AuthenticationService,  private router: Router) { }

  ngOnInit() {
    this.user = new User(0, "", "");
    this.authService.logout();

  }


  onSubmit() : void {
        this.submitted = true;
        this.authService.login(this.user.name, this.user.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/travels']);
                } else {
                    // login failed
                    this.handleError('Username or password is incorrect');
                    this.submitted = false;
                }
            });
    }

  handleError(error:string) :void {
    console.log(error);
    this.error = error;
  }
  tryAgain() {
    console.log("Hit Try Again!");
    this.error = undefined;
    this.submitted = false;

  }
}
