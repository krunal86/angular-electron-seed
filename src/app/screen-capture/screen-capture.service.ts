import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
export class UploadFile {
  constructor(
    public fileName: string
  ) { }

}

@Injectable()
export class ScreenCaptureService {
  constructor(private router: Router, private http: Http) {
  }

  file(file: any) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    // const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    // headers.append('Accept', 'application/json');
    // const options = new RequestOptions({ headers: headers });
    return this.http.post('http://192.168.0.9:3001/api/uploadFile', file, options)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error));
  }
}
