function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function generateRandomString() {
  return Math.random().toString(36).substring(7);
}

// This function returns svg dom object of the liquid based
// of the passed config object
function generateWaveHtml(config, svgClasses) {
  let { fill, liquid, colors, color } = config;
  let isGradient = fill === 'gradient';
  switch (liquid) {
    case 'blob4':
    case 'blob5':
    case 'blob6':
      svgClasses += ' rotate-180';
    break;
  }

  let id = generateRandomString();
  let str = `
    <svg xmlns="http://www.w3.org/2000/svg" class="${svgClasses} ${liquid}" 
      preserveAspectRatio="none" viewBox="0 0 580 400">
      <path fill="${isGradient ? `url(#${id})` : color}" />
        ${isGradient ? `<defs>
            <linearGradient id="${id}" spreadMethod="pad">
              <stop offset="0%" stop-color="${colors[0]}" stop-opacity="1" />
              <stop offset="100%" stop-color="${colors[1]}" stop-opacity="1" />
            </linearGradient>
        </defs> `
      : ''}      
    </svg> `;
  
  return new DOMParser().parseFromString(str,
    'text/xml'
  ).firstChild;
}

function init() {
  const colorsConfig = [
    {
      fill: 'gradient',
      colors: ['#4facfe', '#00f2fe'],
      liquid: 'blob1'
    },
    {
      fill: 'singleColor',
      color: '#000',
      liquid: 'blob4'
    },
    {
      fill: 'gradient',
      colors: ['#f093fb', '#f5576c'],
      liquid: 'blob2'
    },
    {
      fill: 'singleColor',
      color: '#FFF',
      liquid: 'blob5'
    },
    {
      fill: 'gradient',
      colors: ['#84fab0', '#8fd3f4'],
      liquid: 'blob3'
    },
    {
      fill: 'singleColor',
      color: '#000',
      liquid: 'blob6'
    },
    {
      fill: 'gradient',
      colors: ['#fa709a', '#fee140'],
      liquid: 'blob1'
    },
  ];

  const svgRoot = document.querySelector('.svg-list');
  svgRoot.appendChild(generateWaveHtml(colorsConfig[0], 'primary'));
  
  let index = 1;
  function waveAnimate() {
    index = index % colorsConfig.length;
    let currentPrimary = document.querySelector('.primary');
    svgRoot.appendChild(generateWaveHtml(colorsConfig[index], 'primary'));

    let currentSecondary = document.querySelector('.secondary');
    if (currentSecondary) {
      currentSecondary.remove();
    }
    currentPrimary.classList.remove('primary');
    currentPrimary.classList.add('secondary');
    index++;
  }

  let noOfSeconds = 10;
  let last = 0.01;
  function animate(now) {
    // for every 2 seconds call the inner function
    if (now - last >= noOfSeconds * 1000) {
      last = now;
      waveAnimate();
    }
    requestAnimationFrame(animate);
  };
  animate();
}
init();