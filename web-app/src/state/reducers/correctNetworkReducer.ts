interface Action {
	type: string,
	payload: boolean
}

const correctNetworkReducer = (correctNetwork:boolean = false, action: Action) => {
	if(action.type === "SET_CORRECT_NETWORK") {
		return action.payload;
	}

	return correctNetwork;
};

export default correctNetworkReducer;
