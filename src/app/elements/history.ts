import { ScreenCaptureComponent } from '../screen-capture/screen-capture.component';
import { Utils } from '../utils';

export class HistoryComponent {
  canvas: any;
  editor: ScreenCaptureComponent;
  className: any;
  state: any;
  position: any;
  socketEnable: any;
  socket: any;
  myjson: any;
  canvasImage: any;

  constructor(canvas: any, editor: ScreenCaptureComponent) {
    this.canvas = canvas;
    this.editor = editor;
    this.className = 'History';
    this.state = [];
    this.position = 0;
    this.socketEnable = false;
  }

  save() {
    let inst = this;
    inst.myjson = {
      canvas: JSON.stringify(inst.canvas),
      width: inst.canvas.getWidth(),
      height: inst.canvas.getHeight()
    };
    this.position = Math.min(this.position, this.state.length - 1);
    this.state = this.state.slice(0, this.position + 1);
    inst.state.push(inst.myjson);
    /*implement afterwards
        //let dataURL = inst.canvas.toDataURL('image/jpeg', 0.5)
        //let dataURI = Utils.dataURItoBlob(dataURL)
        //this.canvasImage = document.getElementById('canvasImage')
        //this.canvasImage.setAttribute('src', dataURL)
    */
    /*formData = new FormData(document.forms[0])s
    formData.append('canvasImage',dataURI)*/

    // console.log(inst.editor.utils.dataURItoBlob(inst.canvas.toDataURL('image/jpeg',0.5)))

    if (inst.socketEnable) {
      inst.socket.emit('updateCanvas', { canvasJsonObject: this.myjson });
    }
    this.position++;
  }

  undo() {
    let inst = this;
    if (inst.canUndo()) {
      inst.canvas.clear().renderAll();
      this.position = this.position - 1;
      this.update();
    }
  }
  redo() {
    let inst = this;
    if (inst.canRedo()) {
      inst.canvas.clear().renderAll();
      this.position = this.position + 1;
      this.update();
    }
  }

  resetAll() {
    this.state = [];
    this.position = 0;
    this.canvas.clear().renderAll();
  }

  canUndo() {
    return this.position > 0;
  }

  canRedo() {
    return this.position < this.count();
  }

  count() {
    return this.state.length - 1;
  }

  update() {
    let inst = this;
    let jsonObj = this.state[this.position];
    inst.canvas.loadFromJSON(jsonObj.canvas);
    inst.canvas.renderAll();
    inst.canvas.setWidth(jsonObj.width);
    inst.canvas.setHeight(jsonObj.height);
  }
}
