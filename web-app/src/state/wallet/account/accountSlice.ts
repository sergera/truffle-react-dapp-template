import { createSlice } from '@reduxjs/toolkit';

const initialState:string = "";

interface Action {
	type: string,
	payload: string
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		accountChanged(state, action:Action) {
			return action.payload;
		}
	}
});

export const { accountChanged } = accountSlice.actions;

export default accountSlice.reducer;
