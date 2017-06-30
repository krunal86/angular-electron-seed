import 'fabric';
declare const fabric: any;
import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';

export class SprayComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  width: any;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'Spray';
    this.width = 20;
  }

  onMouseUp(event: any) {
    let inst = this;
    if (inst.canvas.isDrawingMode === 1) {
      inst.editor.history.save();
    }

  }

  draw() {
    this.canvas.isDrawingMode = 1;
    this.canvas.freeDrawingBrush = new fabric['SprayBrush'](this.canvas);
    this.canvas.freeDrawingBrush.color = this.editor.strokeClr.getColor();
    this.canvas.freeDrawingBrush.width = this.width;
  }

}
