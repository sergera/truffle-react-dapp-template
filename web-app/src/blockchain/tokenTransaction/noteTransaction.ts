import { txCall } from "../contracts";
import { getErrorMessage } from "../../error";

import { getConfirmationBlocks, getConfirmationDelaySeconds } from "../../env";

import { CONTRACTS, CONTRACT_FUNCTIONS } from "../../constants";

import { CreateNoteArgs } from "./noteTransaction.types";

const maxConfirmations = getConfirmationBlocks();
const confirmationDelaySeconds = getConfirmationDelaySeconds();

export const createNote = async ({
	title,
	content,
	owner,
	onSending=()=>{},
	onSent=()=>{},
	onTxHash=()=>{},
	onReceipt=()=>{},
	onFirstConfirmation=()=>{},
	onIntermediateConfirmation=()=>{},
	onFinalConfirmation=()=>{},
	onTxError=()=>{},
	onError=()=>{},
}:CreateNoteArgs) => {
	await txCall({
		contract: CONTRACTS.notes,
		method: CONTRACT_FUNCTIONS[CONTRACTS.notes].tx.create,
		args: [
			title,
			content,
		],
		options: {
			from: owner,
		},
		onSending: () => {
			onSending();
		},
		onSent: () => {
			onSent();
		},
		onReceipt: (receipt) => {
			onReceipt(receipt);
		},
		onTransactionHash: (transactionHash) => {
			onTxHash(transactionHash);
		},
		onConfirmation: (confirmation) => {
			if(confirmation < maxConfirmations) {
				if(confirmation === 0) {
					onFirstConfirmation(confirmation, maxConfirmations);
				} else {
					onIntermediateConfirmation(confirmation, maxConfirmations);
				}
			} else if(confirmation === maxConfirmations) {
				setTimeout(() => {
					onFinalConfirmation(confirmation, maxConfirmations);
				}, confirmationDelaySeconds*1000);
			}
		},
		onTxError: (error, receipt) => {
			onTxError(getErrorMessage(error), receipt);
		},
		onError: (error) => {
			onError(getErrorMessage(error));
		}
	});
};
