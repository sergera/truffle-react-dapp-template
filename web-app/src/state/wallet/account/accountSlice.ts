// Actions
const CHANGED = "wallet/account/changed";

// Reducer
export const accountReducer = (connectedAccount: string = "", action: Action) => {
	switch (action.type) {
		default:
			return connectedAccount;
		case CHANGED:
			return action.payload;
	};
};

interface Action {
	type: string,
	payload: string
};

// Action Creators
export const accountChanged = (newAccount: string) => {
	return {
		type: CHANGED,
		payload: newAccount
	};
};
