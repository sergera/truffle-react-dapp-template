/********
 * Polyfill for older browsers
 * 
 * Adds Date.now function
 * 
 * This is useful since Date.now() is slightly faster than new Date().getTime()
 * 
 * Returns timestamp in miliseconds
 * 
 */

if (!Date.now) {
	Date.now = function() { 
		return new Date().getTime(); 
	};
};
