import { getRandomNumbersBetween } from '../../utilities/js-helpers.js';

const options = {
  randomize: false,
  position: 'left',
  backgroundColor: '#181818',
  blobColor: '#ff6347'
}
let timerId;

const gui = new dat.GUI();
gui.addColor(options, 'backgroundColor').name('Background');
gui.add(options, 'randomize').name('Randomize').onChange(function() {
  if (options.randomize) {
    randomizeColors();
  } else {
    cancelAnimationFrame(timerId)
  }
})
let primaryColor = gui.addColor(options, 'blobColor').name('Blob');

var last = Date.now(); // timestamp of the last render() call
var noOfSeconds = 6;
var currentTime;

function randomizeColors() {
  currentTime = Date.now();
  if (currentTime - last >= noOfSeconds * 1000) {
    last = currentTime;

    // our work
    primaryColor.setValue(flatColors[getRandomNumbersBetween(0, flatColors.length - 1)]); 
    // the above line automatically does this -> options.blobColor = color;
    setColors();
  }
  timerId = requestAnimationFrame(randomizeColors);
}

function setColors() {
  document.querySelector('.box').style.backgroundColor = options.blobColor;
  [].forEach.call(document.querySelectorAll('.piece'), function (div) {
    div.style.backgroundColor = options.blobColor;
  });
}

function init() {
  if (options.randomize) {
    randomizeColors();
  }
  setColors();
}

init();