import { isNetSupported, getNetName } from '../../../utils/ethereumNetworks';

// Actions
const CHANGED = "wallet/network/changed";

// Reducer
export const networkReducer = (state: Slice = InitialState, action: Action) => {
	switch (action.type) {
		default:
			return {
				connected: state.connected,
				isPermitted: state.isPermitted
			};
		case CHANGED:
			return {
				connected: getNetName(action.payload),
				isPermitted: isNetSupported(action.payload)
			};
	};
};

const InitialState = {
	connected: "",
	isPermitted: false
}

interface Slice {
	connected: string,
	isPermitted: boolean
};

interface Action {
	type: string,
	payload: number
};

// Action Creators
export const networkChanged = (newNetwork: number) => {
	return {
		type: CHANGED,
		payload: newNetwork
	};
};
