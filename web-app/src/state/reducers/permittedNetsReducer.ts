interface Action {
	type: string,
	payload: Array<string>
}

const permittedNetsReducer = (permittedNets: Array<string> = [], action: Action) => {
	if(action.type === "SET_PERMITTED_NETWORKS") {
		return action.payload;
	}

	return permittedNets;
};

export default permittedNetsReducer;
