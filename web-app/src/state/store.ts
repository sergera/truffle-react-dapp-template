import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import providerReducer from './wallet/provider/providerSlice';
import chainReducer from './wallet/chain/chainSlice';
import accountReducer from './wallet/account/accountSlice';
import modalReducer from './modal/modalSlice';
import errorNotificationReducer from './errorNotification/errorNotificationSlice';

export const combinedReducer = combineReducers({
	provider: providerReducer,
	chain: chainReducer,
	account: accountReducer,
	modal: modalReducer,
	errorNotification: errorNotificationReducer,
});

const store = configureStore({
	reducer: combinedReducer
});

export const useAppDispatch = () => useDispatch<Dispatch>();

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
