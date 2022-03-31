/********
 * Safely open urls in new or existing browsing context
 * 
 * Both functions maintain history (possible to use "back" button)
 * 
 */

export function newTab(url: string) {
	const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
	if (newWindow) newWindow.opener = null;
};

export function sameTab(url: string) {
	window.location.assign(url);
};
