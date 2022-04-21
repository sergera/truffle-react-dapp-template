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
	onError?: Function;
}

export interface TxCallArgs {
	contract: string;
	method: string;
	args: any[];
	options?: SendOptions;
	onSending?: Function;
	onSent?: Function;
	onTransactionHash?: Function;
	onReceipt?: Function;
	onConfirmation?: Function;
	onError?: Function;
}

export interface EstimateGasArgs {
	contract: string;
	method: string;
	args: any[];
}
