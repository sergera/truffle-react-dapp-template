const ELEMENT_MIN_PERCENTILE_DISTANCE_FROM_EDGE = .20;
const DISTANCE_OVERHEAD = .05;

function distanceFromTop(element) {
	var yPosition = 0;
	while(element instanceof HTMLElement) {
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return yPosition;
};

function scrollIntoView(element) {
	const bottomOfScreen = window.scrollY + window.innerHeight;
	const percentileDistanceFromBottom = ((bottomOfScreen - distanceFromTop(element)) / window.innerHeight).toFixed(2);
	if(percentileDistanceFromBottom < ELEMENT_MIN_PERCENTILE_DISTANCE_FROM_EDGE) {
		/* if element too close to bottom, keep min percentile distance */
		window.scrollBy(0, parseInt((ELEMENT_MIN_PERCENTILE_DISTANCE_FROM_EDGE - percentileDistanceFromBottom) * window.innerHeight * (1 + DISTANCE_OVERHEAD)));
	} else if (percentileDistanceFromBottom > Math.abs(1 - ELEMENT_MIN_PERCENTILE_DISTANCE_FROM_EDGE)) {
		/* if element too close to top, keep min percentile distance */
		window.scrollBy(0, -1 * parseInt((ELEMENT_MIN_PERCENTILE_DISTANCE_FROM_EDGE - (1 -percentileDistanceFromBottom)) * window.innerHeight * (1 + DISTANCE_OVERHEAD)));
	}
};

document.addEventListener('focus', function(e) {
	scrollIntoView(e.target);
}, true);
