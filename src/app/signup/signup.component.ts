import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RegisterService, Register } from './signup.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  providers: [RegisterService]
})

export class SignupComponent implements OnInit {
  public newUser = new Register('', '', '');

  constructor(private service: RegisterService, private router: Router) { }

  checkSignup() {
    let confPass = (<HTMLInputElement>document.getElementById('cnfPassword')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;

    if (confPass == password) {
      this.signup();
    } else {
      alert('Password is not matched with confirm password.');
    }
  }

  signup() {
    this.service.register(this.newUser).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['login']);
        console.log(data);
      },
      (err) => {
        alert('Yout are not registered yet. There might be some internal server error');
      }
    );
  }


  login() {
    this.router.navigate(['login']);
  }
  ngOnInit() { }
}
