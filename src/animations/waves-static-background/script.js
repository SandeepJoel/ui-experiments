let toggle = false;
setInterval(() => {
  if (toggle) {
    document.getElementById('a1').classList.remove('hide')
    document.getElementById('a2').classList.add('hide')
    toggle = false;
  } else {
    document.getElementById('a2').classList.remove('hide')
    document.getElementById('a1').classList.add('hide')
    toggle = true;
  }
}, 10000);