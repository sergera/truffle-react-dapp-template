Element.prototype.documentOffsetTop = function () {
  return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
};

Element.prototype.scrollIntoViewCenter = function () {
  window.scrollTo(0, this.documentOffsetTop() - (window.innerHeight / 2));
};

document.addEventListener('focus', function(e) {
	document.activeElement.scrollIntoViewCenter();
}, true);
