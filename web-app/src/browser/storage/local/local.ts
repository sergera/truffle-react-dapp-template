/********
 * Browser local storage
 * 
 * Persistent, no predictable expiration
 * 
 */

export function set(key: string, value: string) {
	window.localStorage.setItem(key, value);
};

export function get(key: string) {
	window.localStorage.getItem(key);
};

export function getKey(index: number) {
	window.localStorage.key(index)
};

export function remove(key: string) {
	window.localStorage.removeItem(key);
};

export function clear() {
	window.localStorage.clear();
};
