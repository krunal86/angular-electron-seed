import 'fabric';
declare const fabric: any;
import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';

export class GalleryComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  width: any;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'Gallery';
    this.init();
  }

  init() {
    let inst = this;
    inst.bindEvents();
  }

  bindEvents() {
    let inst = this;
    (<HTMLElement><any>document.getElementById('addImage')).onchange = function (event) {
      // grab the first image in the FileList object and pass it to the function
      let input = <HTMLInputElement>event.target;
      let files = input.files;
      inst.renderImage(files[0]);
    };
  }

  renderImage(file: any) {
    let reader = new FileReader();
    let inst = this;

    // inject an image with the src url
    reader.onload = function (event: Event) {
      let imgObj = new Image();
      let target = <FileReader>event.target;
      imgObj.src = target.result;
      imgObj.onload = function () {
        let image = new fabric.Image(imgObj);
        image.set({
          angle: 0,
          padding: 10,
          cornersize: 10,
          height: 110,
          width: 110
        });
        inst.canvas.centerObject(image).add(image).renderAll();
        inst.editor.history.save();
      };

    };
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
  }
}
