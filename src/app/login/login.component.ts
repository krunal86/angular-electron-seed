import { Component, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService, User } from './authentication.service';

@Component({
  templateUrl: './login.component.html',
  providers: [AuthenticationService]
})

@Injectable()
export class LoginComponent implements OnInit {

  public user = new User('', '');
  public msg = '';

  ngOnInit() {

    // localStorage.removeItem('user');
  }

  constructor(private service: AuthenticationService, private router: Router) { }

  /*login() {
    if (!this._service.login(this.user)) {
      this.msg = 'Failed to login';
    }*/
  login() {
    this.service.login(this.user).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['home']);
        console.log(data);
        console.log(localStorage);
      },
      (err) => {
        alert('wrong email and password');
      });
  }

  signup() {
    this.router.navigate(['signup']);
  }
}
