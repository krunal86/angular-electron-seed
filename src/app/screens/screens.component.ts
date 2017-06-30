import { Component, OnInit } from '@angular/core';
import { desktopCapturer, screen, ipcRenderer } from 'electron';
import { Router, ActivatedRoute, Params } from '@angular/router';
const os = require('os');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
let selectedScreen: any;
const electron = require('electron').remote;
const app = electron.app;

@Component({
  selector: 'screens',
  templateUrl: './screens.component.html'
})

export class ScreensComponent implements OnInit {

  thumbSize = this.determineScreenShotSize();
  options = { types: ['window'], thumbnailSize: this.thumbSize };

  constructor(private router: Router) {

  }

  ngOnInit() {
    let allScreens: Array<any> = [];

    desktopCapturer.getSources(this.options, function (error: Error, sources) {
      allScreens = sources;
      let counter = 0;
      console.log(allScreens);
      sources.forEach(function (source, i) {
        if (source.name != 'quick_capture' && source.name != 'Angular2App') {
          let tempFolderPath = app.getPath('temp');

          mkdirp(tempFolderPath + '/screenshot/', function (errorMakeDir: Error) {
            if (errorMakeDir) {
              console.error(errorMakeDir);
            } else {
              console.log('folder created');
            }
          });
          console.log(source);
          console.log(path);
          console.log(os.tmpdir());
          console.log('screenshot' + source.id + '.png');
          const screenshotPath = path.join(os.tmpdir(), 'screenshot/' + source.id + '.png');

          console.log(screenshotPath);
          fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function (errorWriteFile: Error) {
            var div = document.createElement('div');
            div.setAttribute('class', 'screen');
            div.setAttribute('id', source.id + 'div');
            document.getElementById('screens').appendChild(div);

            var canv = document.createElement('canvas');
            canv.setAttribute('id', source.id);
            div.appendChild(canv);
            var canvas = <HTMLCanvasElement>document.getElementById(source.id);
            var context = canvas.getContext('2d');

            var imageObj = new Image();
            imageObj.onload = function () {
              context.drawImage(imageObj, 0, 0, 207, 150);
            };

            imageObj.src = 'file://' + screenshotPath;
            // var ele = document.getElementById(source.id);
            canvas.addEventListener('click', () => {
              // ipcRenderer.send('selectCaptureScreens', source.id)
              console.log(source.id);
              localStorage.setItem('selectedScreen', source.id);

            });
          });
        }
      });
    });
  }
  determineScreenShotSize() {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return {
      width: maxDimension * window.devicePixelRatio,
      height: maxDimension * window.devicePixelRatio
    };
  }

  openSelectedScreen() {
    // ipcRenderer.send('openNewWindow', 'editScreens')
    this.router.navigate(['editScreens']);
    console.log(selectedScreen);
  }

  closeWindow() {
    ipcRenderer.send('closeWindow', 'feedback');
  }
}
