function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function generateRandomString() {
  return Math.random().toString(36).substring(7);
}

// This function returns svg dom object of the wave based
// of the passed config object
function generateWaveHtml(config, svgClasses) {
  let { type, wave, colors, color } = config;
  let isGradient = type === 'gradient';
  let id = generateRandomString();
  let str = `
    <svg xmlns="http://www.w3.org/2000/svg" class="${svgClasses} ${wave}" 
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
      type: 'gradient',
      colors: ['#4facfe', '#00f2fe'],
      wave: 'blob1'
    },
    {
      type: 'singleColor',
      color: '#000',
      wave: 'blob1'
    },
    {
      type: 'gradient',
      colors: ['#f093fb', '#f5576c'],
      wave: 'blob2'
    },
    {
      type: 'singleColor',
      color: '#FFF',
      wave: 'blob2'
    },
    {
      type: 'gradient',
      colors: ['#84fab0', '#8fd3f4'],
      wave: 'blob1'
    },
    {
      type: 'singleColor',
      color: '#000',
      wave: 'blob1'
    },
    {
      type: 'gradient',
      colors: ['#fa709a', '#fee140'],
      wave: 'blob1'
    },
  ];

  const svgRoot = document.querySelector('.svg-list');
  svgRoot.appendChild(generateWaveHtml(colorsConfig[0], 'primary'));
  
  let index = 1;
  setInterval(() => {
    index = index % colorsConfig.length;
    let currentPrimary = document.querySelector('.primary');
    svgRoot.appendChild(generateWaveHtml(colorsConfig[index], 'primary'));

    let currentSecondary = document.querySelector('.secondary');
    if (currentSecondary) {
      currentSecondary.remove()
    }
    currentPrimary.classList.remove('primary');
    currentPrimary.classList.add('secondary');
    index++;
  }, 10000);
}
init();