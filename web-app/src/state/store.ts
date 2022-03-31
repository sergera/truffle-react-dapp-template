import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { providerReducer } from './wallet/provider';
import { chainReducer } from './wallet/chain';
import { accountReducer } from './wallet/account';
import { modalReducer } from './modal';
import { errorNotificationReducer } from './errorNotification';

export const combinedReducer = combineReducers({
	provider: providerReducer,
	chain: chainReducer,
	account: accountReducer,
	modal: modalReducer,
	errorNotification: errorNotificationReducer,
});

export const store = configureStore({
	reducer: combinedReducer
});

export const useAppDispatch = () => useDispatch<Dispatch>();

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
