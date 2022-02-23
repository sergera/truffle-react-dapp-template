interface Action {
	type: string
}

const toggleModalReducer = (toggleModal:boolean = false, action: Action) => {
	if(action.type === "TOGGLE_MODAL") {
		return !toggleModal
	}

	return toggleModal;
};

export default toggleModalReducer;
