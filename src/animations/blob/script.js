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
const flatColors = ['#487eb0', '#2ecc71', '#ee5253', '#feca57', '#8c7ae6'];
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
    clearInterval(randomTick);
  }
})

if (options.randomize) {
  randomizeColors();
}

function randomizeColors() {
  randomTick = setInterval(() => {
    primaryColor.setValue(
      flatColors[getRandomNumbersBetween(0, flatColors.length - 1)]
    );
  }, 2500);
}

gui.close()