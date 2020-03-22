
import { 
  hexToRgb,  
  drawPolygon,
  drawCircle,
  getRandomHexColor
} from "../../utilities/canvas-helpers.js";
import { 
  debounce,
  getRandomNumbersBetween,
  getRandomItemFrom,
 } from "../../utilities/js-helpers.js";

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let allParticles = [];
let particleMinRadius = 20;
let particleMaxRadius = 25;
let config = {
  particleColor: '#C70039',
  backgroundColor: '#000000',
  spread: 'medium',
  position: 'right'
}

let spread = config.spread === 'medium' ? 500: 1000;
let horizontalPosition;
switch (config.position) {
  case 'right':
    horizontalPosition = 2/3;
  break;
  case 'left':
    horizontalPosition = 1/3.3;
  break;
  case 'center':
    horizontalPosition = 1/2;
  break;        
}


function particles (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.sides = getRandomNumbersBetween(3, 5);
  this.velocity = {
    x: getRandomNumbersBetween(-10, 10)/10,
    y: getRandomNumbersBetween(-10, 10)/10
  };    
  this.ttl = spread;
  this.rotation = getRandomNumbersBetween(0, 360) * (Math.PI/180);
  this.rotationOffset = Math.random() > 0.5 ? 0.01: -0.01;
  this.opacity = 1;
  this.color = hexToRgb(config.particleColor);
}

particles.prototype.update = function () {  
  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.rotation += this.rotationOffset;  
  this.opacity -= 1/this.ttl;
  this.draw();
}

particles.prototype.draw = function () {
  //for circles
  // drawCircle(c,this.x, this.y, this.r, this.color, this.opacity, 'stroke')
  
  // for polygons
  drawPolygon(c, this.x, this.y, this.r, this.sides, this.rotation, this.color, this.opacity, 'stroke');
}


let fpsInterval, now, then, elapsed;
// initialize the timer variables and start the animation
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();    
    addParticles();
    particlesSpread();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved
function addParticles() {
  // request another frame
  requestAnimationFrame(addParticles);
  // calc elapsed time since last loop
  now = Date.now();
  elapsed = now - then;
  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);
    // Put your drawing code here
    allParticles.push(new particles(canvas.width * (horizontalPosition), (canvas.height/2 - 50), getRandomNumbersBetween(particleMinRadius, particleMaxRadius)));
  }
}

let bgColor = hexToRgb(config.backgroundColor);
function particlesSpread () {
  // to get trail effect
  hexToRgb(config.backgroundColor);
  c.fillStyle = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0.1)`;
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  
  // use below code to disable trail effect;
  // c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  allParticles.forEach((element, index) => {
    element.update();
    if (element.ttl <= 1) {
      allParticles.splice(index, 1);
    }
   });
   requestAnimationFrame(particlesSpread);
}

startAnimating(3.5);

/* event handlers */
window.addEventListener('resize', debounce(function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  }, 1000)
);