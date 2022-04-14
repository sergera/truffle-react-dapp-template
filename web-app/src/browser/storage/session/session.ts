/********
 * Browser session storage
 * 
 * Volatile, expires on page session end
 * 
 * Session ends on tab close, or browser close
 * 
 * Survives page reloads and restores
 * 
 */

export function set(key: string, value: string) {
	window.sessionStorage.setItem(key, value);
};

export function get(key: string) {
	window.sessionStorage.getItem(key);
};

export function getKey(index: number) {
	window.sessionStorage.key(index)
};

export function remove(key: string) {
	window.sessionStorage.removeItem(key);
};

export function clear() {
	window.sessionStorage.clear();
};
