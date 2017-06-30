import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

export class Register {
  constructor(
    public userName: string,
    public email: string,
    public password: string
  ) { }
}

@Injectable()
export class RegisterService {
  constructor(private router: Router, private http: Http) {
  }

  register(user: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://192.168.0.13:3001/api/createUser', user, options).map((res: Response) => res.json());
  }
}
