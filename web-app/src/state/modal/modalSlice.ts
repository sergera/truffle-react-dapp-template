// Actions
const TOGGLE = "modal/toogle";
const OPEN = "modal/open";
const CLOSE = "modal/close";

// Reducer
export const modalReducer = (open: boolean = false, action: Action) => {
	switch (action.type) {
		default:
			return open;
		case TOGGLE:
			return !open;
		case OPEN:
			return true;
		case CLOSE:
			return false;
	};
};

interface Action {
	type: string,
};

// Action Creators
export const toggleModal = () => {
	return {
		type: TOGGLE
	};
};

export const openModal = () => {
	return {
		type: OPEN
	};
};

export const closeModal = () => {
	return {
		type: CLOSE
	};
};
