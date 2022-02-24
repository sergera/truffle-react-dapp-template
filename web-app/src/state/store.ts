import { configureStore } from '@reduxjs/toolkit'

import networkReducer from './wallet/network/networkSlice';
import accountReducer from './wallet/account/accountSlice';
import modalReducer from './modal/modalSlice';

const store = configureStore({
	reducer: {
		network: networkReducer,
		account: accountReducer,
		openModal: modalReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
