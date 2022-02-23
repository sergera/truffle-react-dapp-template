import { combineReducers } from "redux";

import { networkReducer } from '../wallet/network/networkSlice';
import { accountReducer } from '../wallet/account/accountSlice';
import { modalReducer } from '../modal/modalSlice';

const rootReducer = combineReducers({
	network: networkReducer,
	account: accountReducer,
	openModal: modalReducer
});

export default rootReducer;

// store state type to use in "connect" HOF or "useSelector" hook
export type RootState = ReturnType<typeof rootReducer>;
