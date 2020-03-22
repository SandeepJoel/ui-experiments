import { getRandomNumbersBetween } from '../../utilities/js-helpers.js';
class CssVariableColor {
  constructor(prop) {
    this.prop = prop;
  }
  get value() {
    return getComputedStyle(document.documentElement).getPropertyValue(this.prop).trim();
  }
  set value(hexString) {
    document.documentElement.style.setProperty(this.prop, hexString);
  }
}

const gui = new dat.GUI();
const flatColors = ['#487eb0', '#2ecc71', '#ee5253', '#feca57', '#8c7ae6', '#10ac84', '#2f3640', '#192a56', '#B33771'];
const options = {
  randomize: true  
}

let randomTick;

let primaryColor = gui.addColor(new CssVariableColor('--primary-color'), 'value').name('Blob');
gui.addColor(new CssVariableColor('--background-color'), 'value').name('Background');
gui.add(options, 'randomize').name('Randomize').onChange(function() {
  if (options.randomize) {
    randomizeColors();
  } else {
    cancelAnimationFrame(randomTick)
  }
})

if (options.randomize) {
  randomizeColors();
}

var last = 0; // timestamp of the last render() call
var noOfSeconds = 5;
function randomizeColors(now) {
  // for every 2 seconds call the inner function
  if (!last || now - last >= noOfSeconds * 1000) {
    last = now;
    primaryColor.setValue(
      flatColors[getRandomNumbersBetween(0, flatColors.length - 1)]
    );
  }
  randomTick = requestAnimationFrame(randomizeColors);
}

gui.close()