import { configureStore } from '@reduxjs/toolkit';

import { combinedReducer } from "../state";

export function getNewStore () {
	return configureStore({reducer: combinedReducer});
};
