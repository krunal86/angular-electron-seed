import { Component } from '@angular/core';
import { ScreenCaptureComponent } from '.././screen-capture/screen-capture.component';
import 'fabric';
declare const fabric: any;

@Component({
  moduleId: module.id,
})
export class CircleComponent {
  canvas: any;
  className: any;
  isDrawing: boolean;
  origX: number;
  origY: number;
  editor: ScreenCaptureComponent;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'Circle';
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

    activeObj.set({ rx: Math.abs(inst.origX - pointer.x) / 2 });
    activeObj.set({ ry: Math.abs(inst.origY - pointer.y) / 2 });
    activeObj.setCoords();
    inst.canvas.renderAll();
  }

  onMouseDown(event: any) {
    let inst = this;
    inst.enable();

    let pointer = inst.canvas.getPointer(event.e);
    inst.origX = pointer.x;
    inst.origY = pointer.y;

    let ellipse = new fabric.Ellipse({
      top: inst.origY,
      left: inst.origX,
      rx: 0,
      ry: 0,
      stroke: inst.editor.strokeClr.getColor(),
      strokeWidth: 5,
      fill: inst.editor.fillClr.getColor(),
      transparentCorners: false,
      hasBorders: false,
      hasControls: false
    });

    inst.canvas.add(ellipse).setActiveObject(ellipse);
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
