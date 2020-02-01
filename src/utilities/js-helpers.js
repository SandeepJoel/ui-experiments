// davidwalsh's debounce function
export function debounce(func, wait, immediate) {
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

// function to get random whole number between a range 
//  Note: It is inclusive of the range elements
export function getRandomNumbersBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function to get a random item from an input array
export function getRandomItemFrom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)]
}