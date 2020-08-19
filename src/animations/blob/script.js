import { getRandomNumbersBetween } from '../../utilities/js-helpers.js';

const flatColors = ['#487eb0', '#2ecc71', '#ee5253', '#feca57', '#8c7ae6', '#10ac84', '#2f3640', '#192a56', '#B33771'];

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

const options = {
  randomize: false,
  position: 'left',
  backgroundColor: '#181818',
  blobColor: '#ff6347'
}
let timerId;

const gui = new dat.GUI();
// gui.addColor(options, 'backgroundColor').name('Background');

let backgroundColor = gui.addColor(new CssVariableColor('--background-color'), 'value').name('Background');
gui.add(options, 'randomize').name('Randomize').onChange(function() {
  if (options.randomize) {
    randomizeColors();
  } else {
    cancelAnimationFrame(timerId)
  }
})
// let primaryColor = gui.addColor(options, 'blobColor').name('Blob');
let primaryColor = gui.addColor(new CssVariableColor('--blob-color'), 'value').name('Blob');
var last = Date.now(); // timestamp of the last render() call
var noOfSeconds = 6;
var currentTime;

function randomizeColors() {
  currentTime = Date.now();
  if (currentTime - last >= noOfSeconds * 1000) {
    last = currentTime;
    // our work
    primaryColor.setValue(flatColors[getRandomNumbersBetween(0, flatColors.length - 1)]);     
  }
  timerId = requestAnimationFrame(randomizeColors);
}

function init() {
  if (options.randomize) {
    randomizeColors();
  }
  backgroundColor.setValue(options.backgroundColor); 
  primaryColor.setValue(options.blobColor); 
}

init();