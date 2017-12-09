import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
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
  error: Error;
  constructor(private loginService: LoginService, private authService : AuthService,  private router: Router) { }

  ngOnInit() {
    this.user = new User(0, "", "");
  }

  onSubmit() : void{
    this.submitted = true;
    this.authService.login(this.user.name, this.user.password).subscribe(user => this.user = user, err => this.handleError(err));
    this.router.navigate(['/travels']);
  }

  handleError(error:Error) :void {
    console.log(error);
    this.error = error;
  }
  tryAgain() {
    console.log("Hit Try Again!");
    this.error = undefined;
    this.submitted = false;

  }
}
