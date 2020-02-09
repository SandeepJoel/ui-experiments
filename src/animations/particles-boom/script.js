let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

const mouse = {
  x: window.innerWidth/2,
  y: window.innerHeight/2,
  gravity: false
}


let colorsArray = [
  '#FDBB6D',
  '#D9727F',
  '#AC6D83',
  '#685D79',
  '#465C7A'
]

let pointerConfig = {
  color: '#000',
  radius: 25
}

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
  this.velocityLimit = Math.abs(this.dx * 30);
  this.velocity = Math.abs(this.dx * 0.075);
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
  if (this.x + this.r > window.innerWidth || this.x - this.r < 0) {
    this.dx = -this.dx;
  }

  if (this.y + this.r > window.innerHeight || this.y - this.r < 0) {
    this.dy = -this.dy;
  }

  if (mouse.gravity) {
    let xOffset = (mouse.x - this.x) / 200;
    let yOffset = (mouse.y - this.y) / 200;    
    this.dx = xOffset * (Math.random() > 0.5 ? 2: 0.1);
    this.dy = yOffset * (Math.random() > 0.5 ? 2: 0.1);
  } else if (Math.abs(this.dx) > 0.2 && this.state !== 'accelerate') {
    this.dx -= (this.dx + 0.2)
    this.dy -= (this.dy + 0.2)   
  } else if (Math.abs(this.dx) < 0.2) {
    this.dx = this.dx > 0 ? 0.2 : -0.2;
    this.dy = this.dy > 0 ? 0.2 : -0.2;
  }

  // when the objects touch the cursor, 
  // they will accelerate with velocity
  if (
    Math.abs(this.x - mouse.x) < pointerConfig.radius + this.r && 
    Math.abs(this.y - mouse.y) < pointerConfig.radius + this.r ) {
      this.state = 'accelerate'; 
      this.dx = (this.dx > 0 ? this.velocityLimit : -this.velocityLimit);
      this.dy = (this.dy > 0 ? this.velocityLimit : -this.velocityLimit);
  } else if (Math.abs(this.dx) > 0.2) {
      this.dx -= (this.dx > 0 ? this.velocity : -this.velocity);
      this.dy -= (this.dy > 0 ? this.velocity : -this.velocity);
  } else if (Math.abs(this.dx) < 0.2) {
    this.state = undefined;
    this.dx = this.dx > 0 ? 0.2 : -0.2;
    this.dy = this.dy > 0 ? 0.2 : -0.2;
  }

}

let radiusChange = 10;
let allCircles;
let circleCount = 75;
let circleMinRadius = 5;
let circleMaxRadius = 15;
function init() {
  allCircles = [];
  for (let i = 0; i < circleCount; i++) {
    let r = getRandomNumbersBetween(circleMinRadius, circleMaxRadius);
    // how does the below formula work for perfectly aligning the circles inside the canvas
    let x = Math.random() * (window.innerWidth - 2 * r) + r;
    let y = Math.random() * (window.innerHeight - 2 * r) + r;
    let dx = (Math.random() > 0.5 ? 1 : -1) * 0.2;
    let dy = (Math.random() > 0.5 ? 1 : -1) * 0.2;
    allCircles.push(new circle(x, y, r, dx, dy));
  } 
}

function jAction () {
  c.fillStyle = "#ccc"
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i of allCircles) {
    i.animate();
  }
  c.beginPath();
  c.arc(mouse.x, mouse.y, pointerConfig.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
  c.fillStyle = pointerConfig.color;
  c.fill();
  jActionHandle = requestAnimationFrame(jAction);
}

init();
jAction();

/* event handlers */
window.addEventListener('resize', function(event) { 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});


window.addEventListener('mousemove', function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener('mousedown', function (event) {
  mouse.gravity = true;
});

window.addEventListener('mouseup', function (event) {
  mouse.gravity = false;
});