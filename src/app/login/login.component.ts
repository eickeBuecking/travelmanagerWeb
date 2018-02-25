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
    let user : User;
    this.submitted = true;
    this.authService.login(this.user.name, this.user.password)
        .subscribe(user => {
                this.router.navigate(['/travels']);
            },
            error => { this.handleError(error) }
        )
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
