
setInterval(() => {
  let currentPrimary = document.querySelector('.primary');
  let nextPrimary = currentPrimary.nextElementSibling;
  if (nextPrimary) {
    nextPrimary.classList.add('primary');
    nextPrimary.classList.remove('hide');
  } else {
    document.querySelector('.svg-list').firstElementChild.classList.add('primary');
    document.querySelector('.svg-list').firstElementChild.classList.remove('hide');
  }

  let currentSecondary = document.querySelector('.secondary');
  if(currentSecondary) {
    currentSecondary.classList.remove('secondary');
    currentSecondary.classList.add('hide');
  }  

  currentPrimary.classList.remove('primary');
  currentPrimary.classList.add('secondary');

}, 10000);