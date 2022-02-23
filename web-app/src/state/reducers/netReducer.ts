interface Action {
	type: string,
	payload: string
}

const netReducer = (connectedNet: string = "", action: Action) => {
	if(action.type === "CHANGE_NETWORK") {
		return action.payload;
	}

	return connectedNet;
};

export default netReducer;
