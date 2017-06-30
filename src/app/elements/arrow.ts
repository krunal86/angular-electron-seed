import 'fabric';
import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';
declare const fabric: any;

export class ArrowComponent {
  canvas: any;
  className: any;
  isDrawing: boolean;
  editor: ScreenCaptureComponent;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'Arrow';
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
    let arrow = new fabric.LineArrow(points, {
      strokeWidth: 5,
      fill: inst.editor.fillClr.getColor(),
      stroke: inst.editor.strokeClr.getColor(),
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false
    });
    inst.canvas.add(arrow).setActiveObject(arrow);
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
