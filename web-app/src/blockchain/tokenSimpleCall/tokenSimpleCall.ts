import { simpleCall } from "../contracts";

import { CONTRACTS, CONTRACT_FUNCTIONS } from "../../constants";

import { NotesByUserArgs } from "./tokenSimpleCall.types";

export const notesByUser = async ({
	owner,
}:NotesByUserArgs) => {
	return await simpleCall({
		contract: CONTRACTS.notes,
		method: CONTRACT_FUNCTIONS[CONTRACTS.notes].simple.tokensByOwner,
		args: [owner],
	})
};
