import { getContracts } from "./contracts";

import { getConfirmationBlocks } from "../../env";

import { LooseObject } from "../../types";
import { SimpleCallArgs, TxCallArgs, EstimateGasArgs } from './interact.types';

export async function simpleCall({
	contract, 
	method, 
	args,
	options,
	onError=()=>{}
}: SimpleCallArgs) {
	const contractInstance = getContracts()[contract];
	const contractMethod = contractInstance.methods[method];
	const response = await contractMethod(...args).call(options)
	.catch((err: Error) => {
		onError(err);
	});
	return response;
};

export async function txCall({
	contract,
	method,
	args,
	options,
	onSending=()=>{},
	onSent=()=>{},
	onTransactionHash=()=>{},
	onReceipt=()=>{},
	onConfirmation=()=>{},
	onError=()=>{}
}: TxCallArgs) {
	const contractInstance = getContracts()[contract];
	const contractMethod = contractInstance.methods[method];

	let confirmedBlockHash = "";
	let actualConfirmations = 0;

	const response = await contractMethod(...args).send(options)
	.on("sending", () => {
		onSending();
	})
	.on("sent", () => {
		onSent();
	})
	.on("transactionHash", (transactionHash: string) => {
		onTransactionHash(transactionHash);
	})
	.on("receipt", (receipt: LooseObject) => {
		onReceipt(receipt);
	})
	.on("confirmation", (confirmation: number, receipt: LooseObject, latestBlockHash: string) => {
		/* fired for every confirmation until the 24th confirmation */
		/* fires at seemingly random intervals through http */
		if(latestBlockHash !== confirmedBlockHash) {
			/* if fired, check that the confirmation is actually a new confirmation */
			/* in the case of using http */
			confirmedBlockHash = latestBlockHash;
			onConfirmation(actualConfirmations, receipt, latestBlockHash);	
			actualConfirmations++;
		}
	})
	.on("error", (error: Error, receipt: LooseObject) => {
		/* if tx reject by network with a receipt, receipt will be the second argument */
		onError(error, receipt);
	})
	.catch((err: Error) => {
		onError(err);
	});

	return response;
};

export async function estimateGas({
	contract,
	method,
	args
}: EstimateGasArgs) {
	const contractInstance = getContracts()[contract];
	const contractMethod = contractInstance.methods[method];
	const gasAmount = await contractMethod(...args).estimateGas();
	return String(gasAmount);
};
