function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

export function generateRandomColorRGB() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(Math.floor(Math.random() * 256));
  }
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

export function generateRandomColorHex() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(Math.floor(Math.random() * 256));
  }
  return rgbToHex(arr[0], arr[1], arr[2]).toUpperCase();
}

export function generateRandomColorHsla() {
  var arr = [];
  arr.push(Math.floor(Math.random() * 256));
  arr.push(Math.floor(Math.random() * 101));
  arr.push(Math.floor(Math.random() * 101));
  arr.push((Math.random() * 0.7 + 0.3).toFixed(1));
  return `hsla(${arr[0]}, ${arr[1]}%, ${arr[2]}%, ${arr[3]})`;
}

export function generateRandomColorCMYK() {
  var arr = [];
  for (var i = 0; i < 4; i++) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return `cmyk(${arr[0]}%, ${arr[1]}%, ${arr[2]}%, ${arr[3]}%)`;
}
