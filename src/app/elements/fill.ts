import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';
import { Utils } from '../utils';

export class FillComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  color: any;
  fillPalletEl: any;
  fillColorBarEl: any;
  fillSelectedColorEl: any;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'fill';
    this.color = 'red';
    this.fillPalletEl = document.getElementById('fill-pallet');
    this.fillColorBarEl = document.getElementsByClassName('fill-bar');
    this.fillSelectedColorEl = document.getElementById('fill-active-clr');
    this.init();
  }

  init() {
    let inst = this;
    inst.bindDropDown();
  }

  bindDropDown() {
    let inst = this;

    inst.fillPalletEl.addEventListener('click', function (event: Event) {
      Utils.showHideDropDown(inst.fillColorBarEl[0]);
      let target = <HTMLElement>event.target;
      if (target && target.className.indexOf('fill') !== -1) {
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
    this.fillSelectedColorEl.style.backgroundColor = color;
    let selectedObj = this.canvas.getActiveObject();
    if (selectedObj !== undefined) {
      if (selectedObj.get('type') === 'i-text') {
        selectedObj.setColor(color);
      } else if (selectedObj.get('type') === 'ellipse' || selectedObj.get('type') === 'rect') {
        if (selectedObj.getFill() !== null || selectedObj.getFill() !== 'transparent') {
          selectedObj.setColor(color);
        }
      } else if (selectedObj.get('type') === 'lineArrow' || selectedObj.get('type') === 'line') {
        selectedObj.setStroke(color);
      }
      this.canvas.renderAll();
      this.editor.history.save();
    }
  }
}
