import { getRandomNumbersBetween } from '../../utilities/js-helpers.js';

const flatColors = ['#487eb0', '#2ecc71', '#ee5253', '#feca57', '#8c7ae6', '#10ac84', '#2f3640', '#192a56', '#B33771'];
const options = {
  randomize: true,
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

if (options.randomize) {
  randomizeColors();
}
init();

var last = Date.now(); // timestamp of the last render() call
var noOfSeconds = 6;
var currentTime;
var color;

function randomizeColors() {
  currentTime = Date.now();
  if (currentTime - last >= noOfSeconds * 1000) {
    last = currentTime;

    // our work
    color = flatColors[getRandomNumbersBetween(0, flatColors.length - 1)]
    primaryColor.setValue(color); // this line automatically does this -> options.blobColor = color;
    document.querySelector('.box').style.backgroundColor = options.blobColor;
    [].forEach.call(document.querySelectorAll('.piece'), function (div) {
      div.style.backgroundColor = options.blobColor;
    });
  }
  timerId = requestAnimationFrame(randomizeColors);
}

function init() {
  document.querySelector('.box').style.backgroundColor = options.blobColor;
  [].forEach.call(document.querySelectorAll('.piece'), function (div) {
    div.style.backgroundColor = options.blobColor;
  });
}

gui.close();