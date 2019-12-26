
import { 
  hexToRgb,  
  drawPolygon,
  drawCircle
} from "../../utilities/canvas-helpers.js";
import { 
  debounce,
  getRandomNumbersBetween,
  getRandomItemFrom,
 } from "../../utilities/js-helpers.js";

let canvas = document.querySelector('canvas');
let canvasComputedStyleObject = window.getComputedStyle(canvas);

// hack to extract only number units from css style properties; eg: extracting 20 from '20px' string
let canvasBorderWidth = parseInt(canvasComputedStyleObject.borderWidth, 10);
// find why the canvas does not span entire window
let ourWindowWidth = window.innerWidth - (canvasBorderWidth * 2);
let ourWindowHeight = window.innerHeight - (canvasBorderWidth * 2);
canvas.width = ourWindowWidth;
canvas.height = ourWindowHeight;
let c = canvas.getContext('2d');
console.log(`Width - ${ourWindowWidth} Height - ${ourWindowHeight}`);

let mousePosition = {
  x: ourWindowWidth/2,
  y: ourWindowHeight/2 
}
let allParticles = [];
let particleCount = 15;
let particleMinRadius = 10;
let particleMaxRadius = 15;
let particlesSpreadHook;
let addParticlesHook;
let colorsArray = [
  '#C70039'
]

function particles (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.sides = getRandomNumbersBetween(3, 3);
  this.velocity = {
    x: getRandomNumbersBetween(-10, 10)/10,
    y: getRandomNumbersBetween(-10, 10)/10
  };
  this.friction = 0.75;
  this.gravity = 1;
  this.sizeReduction = 3;
  this.ttl = 300;
  this.rotation = getRandomNumbersBetween(0, 360) * (Math.PI/180);
  this.rotationOffset = Math.random() > 0.5 ? 0.01: -0.01;
  this.opacity = 1;
  this.color = hexToRgb(getRandomItemFrom(colorsArray));
}

particles.prototype.update = function () {
  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.rotation += this.rotationOffset;
  // why this needs to be less than ttl ? debug the bug
  this.opacity -= 1/this.ttl;
  this.draw();
}

particles.prototype.draw = function () {
  //for circles
  // TODO: fix the circle bug
  // drawCircle(c,this.x, this.y, this.r, this.color, this.opacity, 'stroke')
  
  // for polygons
  drawPolygon(c, this.x, this.y, this.r, this.sides, this.rotation, this.color, this.opacity, 'stroke');
}


function stopAnimation() {
  cancelAnimationFrame(addParticlesHook);
  cancelAnimationFrame(particlesSpreadHook);
}

let fpsInterval, now, then, elapsed;
// initialize the timer variables and start the animation
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    // allParticles = [];
    addParticles();
    particlesSpread();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved
function addParticles() {
  // request another frame
  addParticlesHook = requestAnimationFrame(addParticles);
  // calc elapsed time since last loop
  now = Date.now();
  elapsed = now - then;
  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);
    // Put your drawing code here
    allParticles.push(new particles(canvas.width/2, canvas.height/2 - 100, getRandomNumbersBetween(particleMinRadius, particleMaxRadius)));
  }
}

function particlesSpread () {
  // to get trail effect
  // c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  // c.fillRect(0, 0, ourWindowWidth, ourWindowHeight);  
  c.clearRect(0, 0, ourWindowWidth, ourWindowHeight);
  allParticles.forEach((element, index) => {
    element.update();
    if (element.ttl <= 0) {
      allParticles.splice(index, 1);
    }
   });
  //  console.log(`Paint Particles Length`, allParticles.length);
   particlesSpreadHook = requestAnimationFrame(particlesSpread);
}

startAnimating(5);

/* event handlers */
window.addEventListener('resize', debounce(function(event) {
  ourWindowWidth = window.innerWidth - (canvasBorderWidth * 2);
  ourWindowHeight = window.innerHeight - (canvasBorderWidth * 2);
  canvas.width = ourWindowWidth;
  canvas.height = ourWindowHeight;
  console.log(`Width - ${ourWindowWidth} Height - ${ourWindowHeight}`);
  }, 1000)
);


window.addEventListener('mousemove', function(event) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

if (document.getElementById('start')) {
  document.getElementById('start').addEventListener('click', function(event) {
    stopAnimation();
    startAnimating(5);
  });
}

if (document.getElementById('stop')) {
  document.getElementById('stop').addEventListener('click', function(event) {  
    stopAnimation();
  });
}