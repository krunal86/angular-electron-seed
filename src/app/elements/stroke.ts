import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';
import { Utils } from '../utils';

declare const fabric: any;

export class StrokeComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  color: any;
  strokePalletEl: any;
  strokeColorBarEl: any;
  strokeSelectedColorEl: any;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.color = 'red';
    this.className = 'stroke';
    this.strokePalletEl = document.getElementById('stroke-pallet');
    this.strokeColorBarEl = document.getElementsByClassName('stroke-bar');
    this.strokeSelectedColorEl = document.getElementById('stroke-active-clr');
    this.init();
  }

  init() {
    let inst = this;
    inst.bindDropDown();
  }

  bindDropDown() {
    let inst = this;

    inst.strokePalletEl.addEventListener('click', function (event: Event) {
      Utils.showHideDropDown(inst.strokeColorBarEl[0]);
      let target = <HTMLElement>event.target;
      if (target && target.className.indexOf('stroke-clr') !== -1) {
        inst.setColor(target.getAttribute('val'));
      }
    });
  }

  getColor() {
    console.log(this.color);
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
    this.strokeSelectedColorEl.style.backgroundColor = color;
    let selectedObj = this.canvas.getActiveObject();
    if (selectedObj !== undefined) {
      if (selectedObj.get('type') === 'i-text') {
        selectedObj.setColor(color);
      } else if (selectedObj.get('type') === 'ellipse' || selectedObj.get('type') === 'rect') {
        // if(selectedObj.getFill() !=== null || selectedObj.getFill() !=== 'transparent'){
        selectedObj.setStroke(color);
        // }
      } else if (selectedObj.get('type') === 'lineArrow' || selectedObj.get('type') === 'line') {
        selectedObj.setStroke(color);
      }
      this.canvas.renderAll();
      this.editor.history.save();
    }
  }
}
