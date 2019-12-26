  // for(i=0, x=0, y=0; i < imageData.length; i+=4, x++) {
  //   if( x > image.width) {
  //     x = 0;
  //     y++;
  //   }
  //   if(imageData[i] > 128) {
  //   }
  // }

let canvas = document.getElementById('logo-appearance');
let ctx = canvas.getContext('2d');
let particles = [];
let scaleFactor = 5;
let particleSize = 4;
let animationId;

function animationComplete () {
  console.log('stop animation')
  // cancelAnimationFrame(animationId);
};

var tl = new TimelineMax({ onComplete: animationComplete });

function draw() {
  canvas.width = image.width * scaleFactor;
  canvas.height = image.height * scaleFactor;
  ctx.drawImage(image, 0, 0);
  let imageData = ctx.getImageData(0, 0, image.width, image.height);
  console.log(imageData);

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let p = (x + (y * imageData.width)) * 4;
      if(imageData.data[p + 3] > 128) {
        let particle = {
          x0: x,
          y0: y,
          x2: image.width/2,
          y2: 0,
          color: `rgb(${imageData.data[p]}, ${imageData.data[p+1]}, ${imageData.data[p+2]})`,
          speed: (Math.random() * 1) + 1
        };
        tl.to(particle, particle.speed, {
          x2: particle.x0,
          y2: particle.y0,
          delay: y/30,
          ease: Power4.easeOut
        }, 0);
        particles.push(particle);
      }
    }
  }
  animationId = requestAnimationFrame(animate)
}


function animate() {
  console.log(`Animating ${particles.length} particles`);  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    ctx.fillStyle = particle.color; 
    ctx.fillRect(particle.x2 * scaleFactor, particle.y2 * scaleFactor, particleSize, particleSize);
    
    // Was trying to render line, but i could do it only for 1 lineWidth
    // ctx.lineWidth = 1; 
    // ctx.moveTo((particle.x2 - 1) * scaleFactor, (particle.y2 - 1) * scaleFactor)
    // ctx.lineTo(particle.x2 * scaleFactor, particle.y2 * scaleFactor);
    // ctx.stroke();
    
    // Was trying to render circles, but i couldn't do it smoothly
    // why is this very slow ?
    // ctx.arc(particle.x2 * scaleFactor, particle.y2 * scaleFactor, particleSize, 0, Math.PI / 180 * 360, false);
    // ctx.fill();
  }
  animationId = requestAnimationFrame(animate);
}


let image = new Image();
image.src = '/animations/logo-appearance/2.png';
image.onload = draw;