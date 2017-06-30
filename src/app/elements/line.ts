import 'fabric';
declare const fabric: any;
import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';

export class DrawLineComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  isDrawing: boolean;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'Line';
    this.isDrawing = false;
  }

  onMouseUp(event: any) {
    let inst = this;
    if (inst.isEnable()) {
      inst.editor.history.save();
    }
    inst.disable();
  }

  onMouseMove(event: any) {
    let inst = this;
    if (!inst.isEnable()) { return; }

    let pointer = inst.canvas.getPointer(event.e);
    let activeObj = inst.canvas.getActiveObject();
    activeObj.set({ x2: pointer.x, y2: pointer.y });
    activeObj.setCoords();
    inst.canvas.renderAll();
  }

  onMouseDown(event: any) {
    let inst = this;
    inst.enable();

    let pointer = inst.canvas.getPointer(event.e);

    let points = [pointer.x, pointer.y, pointer.x, pointer.y];
    let line = new fabric.Line(points, {
      strokeWidth: 5,
      fill: inst.editor.strokeClr.getColor(),
      stroke: inst.editor.strokeClr.getColor(),
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false
    });
    inst.canvas.add(line).setActiveObject(line);
  }

  isEnable() {
    return this.isDrawing && this.editor.currentObject.className === this.className;
  }

  enable() {
    this.isDrawing = true;
  }

  disable() {
    this.isDrawing = false;
  }
}
