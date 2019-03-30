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

function circle (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.velocity = {
    x: getRandomNumbersBetween(-5, 5),
    y: getRandomNumbersBetween(-5, 5)
  };
  this.friction = 0.75;
  this.gravity = 1;
  this.sizeReduction = 3;
  this.color = getRandomColorsFrom(colorsArray);
}

circle.prototype.update = function () {
  // when the ball hits the bottom of the screen
  // Note we are checking for velocity offset to be within the window to bounce properly
  if(this.r + this.y + this.velocity.y > ourWindowHeight) {
    this.velocity.y = - this.velocity.y * this.friction;
    this.r = this.r - this.sizeReduction;
    for (let i = 0; i < 5; i++) {
      allPieces.push(new piece(this.x, this.y, 2));
    }
  } else {
    this.velocity.y += this.gravity;
  } 
  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.draw();
}

circle.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.r, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
  c.fillStyle = this.color;
  c.fill();
}

/**** piece class *******/
//=====================//

function piece (x, y, r) {
  circle.call(this, x, y, r);
  this.velocity = {
    x: getRandomNumbersBetween(-5, 5),
    y: getRandomNumbersBetween(-5, 5)
  };
  this.friction = 0.75;
  this.gravity = 0.1;
  this.ttl = 100;
  this.opacity = 1;
  this.color = getRandomColorsFrom(colorsArray);
}

piece.prototype.update = function () {
  // when the ball hits the bottom of the screen
  // Note we are checking for velocity offset to be within the window to bounce properly
  if(this.r + this.y + this.velocity.y > ourWindowHeight) {
    this.velocity.y = - this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  } 
  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.opacity -= 1 / this.ttl;
  this.draw();
}

piece.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.r, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
  c.fillStyle = this.color;
  this.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
  c.fill();
}



let allCircles;
let allPieces;
let circleCount = 15;
let circleMinRadius = 15;
let circleMaxRadius = 15;
let cursorOffset = 50;
function init() {
  allCircles = [];
  allPieces = [];
  for (let i = 0; i < 1; i++) {
    let r = getRandomNumbersBetween(circleMinRadius, circleMaxRadius);
    let x = canvas.width/2;
    let y = canvas.height/2 - 100;
    allCircles.push(new circle(x, y, r));
  }
}

function jAction () {
  c.clearRect(0, 0, ourWindowWidth, ourWindowHeight);
  allCircles.forEach((element, index) => {
    element.update();
    if (element.r == 0) {
      allCircles.splice(index, 1);
    }
   });

 allPieces.forEach((element, index) => {
  element.update();
  if (element.ttl == 0) {
    allPieces.splice(index, 1);
  }
 });
 
  // for (const [i,v] of allPieces.entries()) {
  //   v[i].update();
  //   if (v[i].r <= 0) {
  //     debugger;
  //     allPieces.splice(i, 1);
  //   }
  // }

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