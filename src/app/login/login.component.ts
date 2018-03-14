import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
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
  constructor(private authService : AuthenticationService,  private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.authService.logout();

  }


  onSubmit() : void {
    let user : User;
    this.submitted = true;
    this.authService.login(this.user.username, this.user.password)
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
