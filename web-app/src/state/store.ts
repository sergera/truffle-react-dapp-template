import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'

import providerReducer from './wallet/provider/providerSlice';
import chainReducer from './wallet/chain/chainSlice';
import accountReducer from './wallet/account/accountSlice';
import modalReducer from './modal/modalSlice';

const store = configureStore({
	reducer: {
		provider: providerReducer,
		chain: chainReducer,
		account: accountReducer,
		modal: modalReducer
	}
});

export type Dispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<Dispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
