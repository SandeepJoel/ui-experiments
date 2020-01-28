/* build DOM elements*/
function splitText($inputElement) {
  let phrase = $inputElement.text();
  let prevLetter;
  let txt;
  let sentence = phrase.split("");
  $inputElement.text("");
  $inputElement.removeClass("hide");
  $.each(sentence, function(index, val) {
    if(val === " "){
      val = "&nbsp;";
    }
    var letter = $("<div/>", {
          id : "txt" + index
    }).addClass('txt').html(val).appendTo($inputElement);

    if(prevLetter) {
      $(letter).css("left", ($(prevLetter).position().left + $(prevLetter).width()) + "px");
    };
    prevLetter = letter;
  });
  txt = $inputElement.find(".txt");
  return txt;
}

function splitHtml($inputElement) {
  $inputElement.text("");
  $inputElement.removeClass("hide");
}

$(window).on('load', function() {
  let tl = new TimelineMax({  repeatDelay: 0.3, repeat: -1});
  $('.split-text').each(function(index){
    let val = splitText($(this));
    tl.add(`start-${index}`);
    tl.staggerFrom(val, 1, {
      cycle: {
        x: function(i) {
          return i * Math.random() * 7;
        },
        y: function(i) {
          return i * Math.random() * 7;
        },
        },
      autoAlpha: 0,
      }, 0.01);
    tl.add(`end-${index}`);
    tl.staggerTo(val, 1, {
      cycle: {
        x: function(i) {
          return i * Math.random() * -7;
        },
        y: function(i) {
          return i * Math.random() * -7;
        },
        },
      autoAlpha: 0,
    },0.01, "+=2");
  });  

  $('.para').each(function(index){
    let val = $(this).find('p');
    tl.staggerFrom(val, 1, {
      cycle: {
        y: function(i) {
          return (i+1) * 30;
        }
      },
      autoAlpha: 0,
    }, 0.1, `start-${index}`)
    tl.staggerTo(val, 1, {
      cycle: {
        y: function(i) {
          return (i+1) * -30;
        },
      },
      autoAlpha: 0,
    },0.1, `end-${index}+=2`);
  });
}); 