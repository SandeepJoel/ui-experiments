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


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}


function getRandomNumbersBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColorsFrom(colorsArray) {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)]
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
  this.friction = 0.75;
  this.gravity = 1;
  this.sizeReduction = 3;
  this.ttl = 300;
  this.rotation = getRandomNumbersBetween(0, 360) * (Math.PI/180);
  this.rotationOffset = Math.random() > 0.5 ? 0.01: -0.01;
  this.opacity = 1;
  this.color = hexToRgb(getRandomColorsFrom(colorsArray));
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
  // c.beginPath();
  // for circles
  // c.arc(this.x, this.y, this.r, Math.PI / 180 * 0, Math.PI / 180 * 360, false);  
  
  // for squares
  // c.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
  // c.fillRect(this.x, this.y, 20, 20);
  // c.fill();

  polygon(c, this.x, this.y, this.r, this.sides, this.rotation, this.color, this.opacity);
}


let allParticles;
let particleCount = 15;
let particleMinRadius = 10;
let particleMaxRadius = 15;
let particleSpawnRate = 2200/10;
function init() {
  allParticles = [];
  // for (let i = 0; i < 1; i++) {
  //   let r = getRandomNumbersBetween(particleMinRadius, particleMaxRadius);
  //   let x = canvas.width/2;
  //   let y = canvas.height/2 - 100;
  //   allParticles.push(new particles(x, y, r));
  // } 
}

setInterval(() => {
  allParticles.push(new particles(canvas.width/2, canvas.height/2 - 100, getRandomNumbersBetween(particleMinRadius, particleMaxRadius)));
}, particleSpawnRate);

function polygon(ctx, x, y, radius, sides, rotateAngle, color, opacity) {
  if (sides < 3) return;
  var a = ((Math.PI * 2)/sides);
  ctx.save();
  ctx.beginPath();
  ctx.translate(x,y);
  ctx.rotate(rotateAngle);
  ctx.moveTo(radius,0);
  for (let i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.shadowBlur = 5;
  ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
  ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;;
  ctx.fill();
  ctx.restore();
}

function jAction () {
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
   console.log(`Particles Length`, allParticles.length);
  jActionHandle = requestAnimationFrame(jAction);
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

init();
jAction();

/* event handlers */
window.addEventListener('resize', debounce(function(event) {
  ourWindowWidth = window.innerWidth - 100;
  ourWindowHeight = window.innerHeight - 100;
  canvas.width = ourWindowWidth;
  canvas.height = ourWindowHeight;
  console.log(`Width - ${ourWindowWidth} Height - ${ourWindowHeight}`);
  init();
  }, 500)
);


window.addEventListener('mousemove', function(event) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

var isPaused = false;

window.onblur = function() {
  isPaused = true;
  // console.log('isPaused');
}

window.onfocus = function() {
  isPaused = false;
  // console.log('isPlaying');
  // init();
}