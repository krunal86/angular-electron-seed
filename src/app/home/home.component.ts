import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;

@Component({
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  authWindow: any;

  constructor( @Inject(DOCUMENT) private document: any, private router: Router) {
    let a = this.document.location.href;
    let b = a.split('=')[1];
    console.log(a.split('=')[1]);
    if (b == 'Screens#/') {
      this.router.navigate(['Screens']);
    } else if (b == 'login#/') {
      this.router.navigate(['login']);
    }
  }

  Screens() {
    ipcRenderer.send('openNewWindow', 'Screens');
  }

  Profile() {
    ipcRenderer.send('openNewWindow', 'login');
  }
  ngOnInit() {
  }

}
