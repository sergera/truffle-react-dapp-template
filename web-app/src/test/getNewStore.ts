import { configureStore } from '@reduxjs/toolkit';
import { combinedReducer } from "../state/store";

export default function getNewStore () {
	return configureStore({reducer: combinedReducer});
};
