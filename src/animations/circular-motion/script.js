let canvas = document.querySelector('canvas');

// find why the canvas does not span entire window
let ourWindowWidth = window.innerWidth - 100;
let ourWindowHeight = window.innerHeight - 100;
canvas.width = ourWindowWidth;
canvas.height = ourWindowHeight;
let c = canvas.getContext('2d');
console.log(`Width - ${ourWindowWidth} Height - ${ourWindowHeight}`);

let mousePosition = {
  x: ourWindowWidth/2,
  y: ourWindowHeight/2
}

let colorsArray = [
  '#FDBB6D',
  // '#D9727F',
  // '#AC6D83',
  // '#685D79',
  // '#465C7A'
]

function getRandomNumbersBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColorsFrom(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)]
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function circle (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.deg = 0;
  this.velocity = 3;
  this.color = getRandomColorsFrom(colorsArray);
}

circle.prototype.animate = function () {
  this.deg += this.velocity;
  this.x = this.x + Math.cos(toRadians(this.deg)) * 5;
  this.y = this.y + Math.sin(toRadians(this.deg)) * 5;
  if (this.deg === 360) {
    console.log('Resetting');
    this.deg = 0;
  }
  c.beginPath();
  c.arc(this.x, this.y, this.r, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
  c.fillStyle = this.color;
  c.fill();
}

let allCircles;
let circleCount = 1;
let circleMinRadius = 5;
let circleMaxRadius = 10;
let cursorOffset = 50;
function init() {
  allCircles = [];
  for (let i = 0; i < circleCount; i++) {
    let r = getRandomNumbersBetween(circleMinRadius, circleMaxRadius);
    // how does the below formula work for perfectly aligning the circles inside the canvas
    // let x = Math.random() * (ourWindowWidth - 2 * r) + r;
    // let y = Math.random() * (ourWindowHeight - 2 * r) + r;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    allCircles.push(new circle(x, y, r));
  }
}

function jAction () {
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.clearRect(0, 0, ourWindowWidth, ourWindowHeight);
  for (let i of allCircles) {
    i.animate();
  }
  jActionHandle = requestAnimationFrame(jAction);
}

init();
jAction();

/* event handlers */
window.addEventListener('resize', function(event) {
  ourWindowWidth = window.innerWidth - 100;
  ourWindowHeight = window.innerHeight - 100;
  canvas.width = ourWindowWidth;
  canvas.height = ourWindowHeight;
  console.log(`Width - ${ourWindowWidth} Height - ${ourWindowHeight}`);
  init();
});


window.addEventListener('mousemove', function(event) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});