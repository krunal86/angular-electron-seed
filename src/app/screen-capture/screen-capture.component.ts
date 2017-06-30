import { Component, OnInit } from '@angular/core';
import { CircleComponent } from '../elements/circle';
import { Utils } from '../utils';
import { HistoryComponent } from '../elements/history';
import { StrokeComponent } from '../elements/stroke';
import { FillComponent } from '../elements/fill';
import { RectangleComponent } from '../elements/rectangle';
import { DrawLineComponent } from '../elements/line';
import { ArrowComponent } from '../elements/arrow';
import { PencilbrushComponent } from '../elements/pencilbrush';
import { SprayComponent } from '../elements/spray';
import { GalleryComponent } from '../elements/gallery';
import { desktopCapturer, screen, ipcRenderer } from 'electron';
import { ScreenCaptureService, UploadFile } from './screen-capture.service';
const electron = require('electron').remote;
const app = electron.app;
import 'fabric';
declare const fabric: any;
  const browserWindowParams = {
      'use-content-size': true,
      center: true,
      show: false,
      resizable: false,
      'always-on-top': true,
      'standard-window': true,
      'auto-hide-menu-bar': true,
      'node-integration': false
  };


@Component({
  templateUrl: './screen-capture.component.html'
})

export class ScreenCaptureComponent implements OnInit {
  canvas: any;
  circle: CircleComponent;
  currentObject: any;
  history: HistoryComponent;
  strokeClr: StrokeComponent;
  fillClr: FillComponent;
  public fileUpload = new UploadFile('');

  options = { types: ['window'] };

  constructor(private uploadFileService: ScreenCaptureService) { }

  ngOnInit() {
    let inst = this;
    console.log('inside screen capture');
    inst.canvas = new fabric.Canvas('canvas');
    // inst.canvas =localStorage.getItem('selectedScreen');
    let tempFolderPath = app.getPath('temp');
    console.log(app.getPath('temp'));
    inst.canvas.setBackgroundImage(tempFolderPath + '/screenshot/' + localStorage.getItem('selectedScreen') + '.png',
      inst.canvas.renderAll.bind(inst.canvas), {
        angle: 0,
        padding: 10,
        cornersize: 10,
        height: 400,
        width: 400,
        backgroundImageStretch: true
      });

    this.history = new HistoryComponent(this.canvas, this);
    inst.strokeClr = new StrokeComponent(inst.canvas, inst);
    inst.fillClr = new FillComponent(inst.canvas, inst);
    inst.bindEvents();
    inst.bindCanvasEvents();
  }

  bindEvents() {
    let inst = this;
    document.getElementById('toolbar-template').addEventListener('click', function (e) {
      let element = Utils.findAncestor(e.target, 'tool');
      if (element) {
        inst.canvas.isDrawingMode = 0;
        let objectType = element.getAttribute('value');
        if (objectType === 'Circle') {
          inst.currentObject = new CircleComponent(inst.canvas, inst);
        } else if (objectType === 'Rectangle') {
          inst.currentObject = new RectangleComponent(inst.canvas, inst);
        } else if (objectType === 'Arrow') {
          inst.currentObject = new ArrowComponent(inst.canvas, inst);
        } else if (objectType === 'Line') {
          inst.currentObject = new DrawLineComponent(inst.canvas, inst);
        } else if (objectType === 'Pencilbrush') {
          inst.currentObject = new PencilbrushComponent(inst.canvas, inst);
          inst.currentObject.draw();
        } else if (objectType === 'Spray') {
          inst.currentObject = new SprayComponent(inst.canvas, inst);
          inst.currentObject.draw();
        } else if (objectType == 'Gallery') {
          inst.currentObject = new GalleryComponent(inst.canvas, inst);
        } else if (objectType === 'Undo') {
          inst.history.undo();
        } else if (objectType === 'Redo') {
          inst.history.redo();
        } else if (objectType === 'Resetall') {
          inst.history.resetAll();
        } else if (objectType === 'save') {
          inst.history.save();
        }
      }
    });
  }

  bindCanvasEvents() {
    let inst = this;
    inst.canvas.on('mouse:down', function (o: any) {
      if (inst.currentObject !== undefined && typeof inst.currentObject.onMouseDown === 'function') {
        inst.currentObject.onMouseDown(o);
      }
    });
    inst.canvas.on('mouse:move', function (o: any) {
      if (inst.currentObject !== undefined && typeof inst.currentObject.onMouseMove === 'function') {
        inst.currentObject.onMouseMove(o);
      }
    });
    inst.canvas.on('mouse:up', function (o: any) {
      if (inst.currentObject !== undefined && typeof inst.currentObject.onMouseUp === 'function') {
        inst.currentObject.onMouseUp(o);
      }
    });
    inst.canvas.on('object:moving', function (o: any) {
      if (inst.currentObject !== undefined && typeof inst.currentObject.disable === 'function') {
        inst.currentObject.disable();
      }
    });
  }


  uploadFile() {
    let inst = this;
    var dataURL = inst.canvas.toDataURL('image/jpeg');
    var file = Utils.dataURItoBlob(dataURL);
    file = new File([file], 'file');
    var fd = new FormData();
    // fd.append("file", file.);
    fd.append('file', 'file.jpg');
    fd.append('file', file);
    console.log(fd);
    this.uploadFileService.file(fd).subscribe(
      (data) => {
        console.log(data);

        // this._router.navigate(['admin/home']);
      },
      (err) => {
        alert('cannot upload file');
      });
  }

}
