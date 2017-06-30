import 'fabric';
declare const fabric: any;
import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';

export class PencilbrushComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  width: any;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'Pencilbrush';
    this.width = 5;
  }
  onMouseUp(event: any) {
    let inst = this;
    if (inst.canvas.isDrawingMode === 1) {
      inst.editor.history.save();
    }
  }

  draw() {
    let inst = this;
    inst.canvas.isDrawingMode = 1;
    inst.canvas.freeDrawingBrush = new fabric['PencilBrush'](this.canvas);
    inst.canvas.freeDrawingBrush.color = inst.editor.strokeClr.getColor();
    inst.canvas.freeDrawingBrush.width = inst.getWidth();
  }

  getWidth() {
    let inst = this;
    let drawingLineWidthEl = parseInt((<HTMLInputElement>document.getElementById('drawing-line-width')).value, 10);
    // drawingLineWidthEl: HTMLElement= document.getElementById("drawing-line-width")
    inst.width = drawingLineWidthEl;
    return inst.width;
  }
}
