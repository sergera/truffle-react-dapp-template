export const changeNet = (newNetwork: string) => {
	return {
		type: "CHANGE_NETWORK",
		payload: newNetwork
	}
};

export const setPermittedNets = (permittedNets: Array<string>) => {
	return {
		type: "SET_PERMITTED_NETWORKS",
		payload: permittedNets
	}
};

export const correctNet = (correctNet: boolean) => {
	return {
		type: "SET_CORRECT_NETWORK",
		payload: correctNet
	}
};

export const changeAccount = (newAccount: string) => {
	return {
		type: "CHANGE_ACCOUNT",
		payload: newAccount
	}
};

export const toggleModal = () => {
	return {
		type: "TOGGLE_MODAL"
	}
};
