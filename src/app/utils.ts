export class Utils {

  static findAncestor(el: any, cls: any) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {
      return el;
    }
  }

  static isShow(element: any) {
    let style = element.currentStyle ? element.currentStyle.display :
      getComputedStyle(element, '').display;
    return style === 'block';
  }

  static showHideDropDown(element: any) {
    if (this.isShow(element)) {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  }

  // static dataURItoBlob(dataURI: any) {
  //   let byteString;
  //   if (dataURI.split(',')[0].indexOf('base64') >= 0) {
  //     byteString = atob(dataURI.split(',')[1]);
  //   } else {
  //     byteString = encodeURI(dataURI.split(',')[1]);
  //   }
  //   // separate out the mime component
  //   let mimeString = dataURI.split(',')[0].split(':')[1].split('')[0];

  //   // write the bytes of the string to a typed array
  //   let ia = new Uint8Array(byteString.length);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([ia], { type: mimeString });
  // }

  static dataURItoBlob(dataURL: any) {

    let BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }

    parts = dataURL.split(BASE64_MARKER);
    contentType = parts[0].split(':')[1];
    raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
}
