interface Action {
	type: string,
	payload: string
}

const accountReducer = (connectedAccount: string = "", action: Action) => {
	if(action.type === "CHANGE_ACCOUNT") {
		return action.payload;
	}
		
	return connectedAccount;
};

export default accountReducer;
