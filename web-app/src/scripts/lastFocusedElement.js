let lastFocusedElement = null;

document.addEventListener('blur', function(e) {
	lastFocusedElement = e.target;
}, true);

export function focusLastElement() {
	document.body.contains(lastFocusedElement) && lastFocusedElement.focus();
};
