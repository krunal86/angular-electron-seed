import 'fabric';
declare const fabric: any;
import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';

export class RectangleComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  isDrawing: boolean;
  origX: number;
  origY: number;


  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'Rectangle';
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

    if (inst.origX > pointer.x) {
      activeObj.set({ left: Math.abs(pointer.x) });

    }
    if (inst.origY > pointer.y) {
      activeObj.set({ top: Math.abs(pointer.y) });
    }
    activeObj.set({ width: Math.abs(inst.origX - pointer.x) });
    activeObj.set({ height: Math.abs(inst.origY - pointer.y) });

    activeObj.setCoords();
    inst.canvas.renderAll();
  }

  onMouseDown(event: any) {
    let inst = this;
    inst.enable();

    let pointer = inst.canvas.getPointer(event.e);
    inst.origX = pointer.x;
    inst.origY = pointer.y;

    let rectangle = new fabric.Rect({
      left: inst.origX,
      top: inst.origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - inst.origX,
      height: pointer.y - inst.origY,
      angle: 0,
      stroke: inst.editor.strokeClr.getColor(),
      strokeWidth: 5,
      fill: inst.editor.fillClr.getColor(),
      transparentCorners: false,
      hasBorders: false,
      hasControls: false
    });
    inst.canvas.add(rectangle).setActiveObject(rectangle);
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
