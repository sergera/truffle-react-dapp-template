import { combineReducers } from "redux";

import netReducer from './netReducer';
import permittedNetsReducer from './permittedNetsReducer';
import correctNetworkReducer from './correctNetworkReducer';
import accountReducer from './accountsReducer';
import toggleModalReducer from './toggleModalReducer';

const reducers = combineReducers({
	network: netReducer,
	permittedNetworks: permittedNetsReducer,
	correctNetwork: correctNetworkReducer,
	account: accountReducer,
	toggleModal: toggleModalReducer
});

export default reducers;

// store state type to use in "connect" HOF or "useSelector" hook
export type State = ReturnType<typeof reducers>;
