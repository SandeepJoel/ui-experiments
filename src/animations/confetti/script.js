
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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');
console.log(`Width - ${window.innerWidth} Height - ${window.innerHeight}`);

let mousePosition = {
  x: window.innerWidth/2,
  y: window.innerHeight/2 
}
let allParticles = [];
let particleMinRadius = 20;
let particleMaxRadius = 25;
let colorsArray = [
  '#C70039'
]

function particles (x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.sides = getRandomNumbersBetween(3, 6);
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
    allParticles.push(new particles(canvas.width/2, (canvas.height/2 - 100), getRandomNumbersBetween(particleMinRadius, particleMaxRadius)));
  }
}

function particlesSpread () {
  // to get trail effect
  // c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  // c.fillRect(0, 0, window.innerWidth, window.innerHeight);  
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  allParticles.forEach((element, index) => {
    element.update();
    if (element.ttl <= 1) {
      allParticles.splice(index, 1);
    }
   });
   requestAnimationFrame(particlesSpread);
}

startAnimating(5);

/* event handlers */
window.addEventListener('resize', debounce(function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(`Width - ${window.innerWidth} Height - ${window.innerHeight}`);
  }, 1000)
);


window.addEventListener('mousemove', function(event) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;  
});