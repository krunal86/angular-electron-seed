import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}

@Injectable()
export class AuthenticationService {
  constructor(private router: Router, private http: Http) {
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  login(user: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://192.168.0.14:3001/api/login', user, options).map((res: Response) => res.json());
  }

  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['login']);
    }
  }
}
