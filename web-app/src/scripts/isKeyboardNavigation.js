import { KEYS } from '../constants';

const RECENT_MILISECOND_THRESHOLD = 50;

const NAVIGATIONAL_KEYS = [
	KEYS.tab,
	KEYS.arrowUp,
	KEYS.arrowDown,
	KEYS.arrowLeft,
	KEYS.arrowRight,
];

let lastKey = {
	key: "",
	time: 0,
};

function isNavigationalKey(key) {
	return NAVIGATIONAL_KEYS.includes(key);
};

function isRecent(recentMiliseconds) {
	return Date.now() - recentMiliseconds < RECENT_MILISECOND_THRESHOLD;
};

export default function isKeyboardNavigation() {
	return isRecent(lastKey.time) && isNavigationalKey(lastKey.key);
};

document.addEventListener('keydown', function(e) {
	lastKey.key = e.key;
	lastKey.time = Date.now();
});
