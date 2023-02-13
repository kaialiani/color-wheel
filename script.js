function updateColor() {
  const colorPicker = document.getElementById("color-picker");
  const selectedColor = document.getElementById("selected-color");
  const hexCode = document.getElementById("hex-code");
  const rgbValues = document.getElementById("rgb-values");
  const hslValues = document.getElementById("hsl-values");

  selectedColor.style.backgroundColor = colorPicker.value;
  hexCode.innerHTML = `HEX: ${colorPicker.value}`;

  const rgb = selectedColor.style.backgroundColor
    .match(/\d+/g)
    .map((num) => Number(num));
  rgbValues.innerHTML = `RGB: ${rgb.join(", ")}`;

  const hsl = `hsl(${rgbToHsl(rgb[0], rgb[1], rgb[2])})`;
  hslValues.innerHTML = `HSL: ${hsl}`;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%`;
}
