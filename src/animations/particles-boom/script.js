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
  '#D9727F',
  '#AC6D83',
  '#685D79',
  '#465C7A'
]

function getRandomNumbersBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColorsFrom(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)]
}

function circle (x, y, r, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.originalr = this.r;
  this.maxBoom = getRandomNumbersBetween(40, 75);
  this.dx = dx;
  this.dy = dy;
  this.color = getRandomColorsFrom(colorsArray);
}

circle.prototype.animate = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.r, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
  c.fillStyle = this.color;
  c.fill();
  
  // updating values for next rendering
  this.x += this.dx;
  this.y += this.dy;
  if (this.x + this.r > ourWindowWidth || this.x - this.r < 0) {
    this.dx = -this.dx;
  }

  if (this.y + this.r > ourWindowHeight || this.y - this.r < 0) {
    this.dy = -this.dy;
  }

if (Math.abs(this.x - mousePosition.x) < cursorOffset && Math.abs(this.y - mousePosition.y) < cursorOffset && this.r < this.maxBoom) {
    this.r += radiusChange;
  } else {
    if (this.r > this.originalr) {
      this.r -= radiusChange;
    }    
  }  
}

let radiusChange = 1;
let allCircles;
let circleCount = 150;
let circleMinRadius = 5;
let circleMaxRadius = 15;
let cursorOffset = 50;
function init() {
  allCircles = [];
  for (let i = 0; i < circleCount; i++) {
    let r = getRandomNumbersBetween(circleMinRadius, circleMaxRadius);
    // how does the below formula work for perfectly aligning the circles inside the canvas
    let x = Math.random() * (ourWindowWidth - 2 * r) + r;
    let y = Math.random() * (ourWindowHeight - 2 * r) + r;
    // Math.random() > 0.5 ? 1 : -1 --> this randomizes the direction
    let dx = (Math.random() > 0.5 ? 1 : -1) * 0.2;
    let dy = (Math.random() > 0.5 ? 1 : -1) * 0.2;
    allCircles.push(new circle(x, y, r, dx, dy));
  } 
}

function jAction () {
  c.clearRect(0, 0, ourWindowWidth, ourWindowHeight);
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