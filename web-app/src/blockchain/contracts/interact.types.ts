import { LooseObject } from "../../types";

interface CallOptions {
	from?: string;
	gasPrice?: string;
	gas?: number;
}

interface SendOptions {
	from?: string;
	gasPrice?: string;
	gas?: string;
	value?: string;
}

export interface SimpleCallArgs {
	contract: string;
	method: string;
	args: any[];
	options?: CallOptions;
	onError?(error: Error): void;
}

export interface TxCallArgs {
	contract: string;
	method: string;
	args: any[];
	options?: SendOptions;
	onSending?: Function;
	onSent?: Function;
	onTransactionHash?(txHash: string): void;
	onReceipt?(receipt: LooseObject): void;
	onConfirmation?(confirmation: number, receipt: LooseObject, latestBlockHash: string): void;
	onTxError?(error: Error, receipt: LooseObject): void;
	onError?(error: Error): void;
}

export interface EstimateGasArgs {
	contract: string;
	method: string;
	args: any[];
}
