import { LooseObject } from "../../types";

export interface CreateNoteArgs {
	title: string;
	content: string;
	owner: string;
	onSending?: Function;
	onSent?: Function;
	onTxHash?(txHash: string): void;
	onReceipt?(receipt: LooseObject): void;
	onFirstConfirmation?(currentConfirmation: number, maxConfirmations: number): void;
	onIntermediateConfirmation?(currentConfirmation: number, maxConfirmations: number): void;
	onFinalConfirmation?(currentConfirmation: number, maxConfirmations: number): void;
	onTxError?(msg: string, receipt: LooseObject): void;
	onError?(msg: string): void;
};
