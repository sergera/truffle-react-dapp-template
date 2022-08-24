import { useState } from "react";

import { ConnectedButtonWithKillswitch as ButtonWithKillswitch } from "../../components/UI/ButtonWithKillswitch";
import { TextInput } from '../../components/UI/TextInput';

import { simpleCall, txCall, estimateGas } from '../../blockchain/contracts';
import { getErrorMessage } from "../../error";
import { Log } from "../../logger";
import { getConfirmationBlocks, getConfirmationDelaySeconds } from "../../env";

import { store } from '../../state';
import { openInfoToast, openSuccessToast } from '../../state/toast';

import { LooseObject } from "../../types";

export function Notes() {

	let [noteTitleInputValue, setNoteTitleInputValue] = useState("");
	let [noteContentInputValue, setNoteContentInputValue] = useState("");
	let [estimatedGas, setEstimatedGas] = useState("");
	let [actualGas, setActualGas] = useState("");
	let [isSending, setIsSending] = useState(false);
	let [isSent, setIsSent] = useState(false);
	let [transactionHash, setTransactionHash] = useState("");
	let [hasReceipt, setHasReceipt] = useState(false);
	let [confirmations, setConfirmations] = useState(0);
	let [notes, setNotes] = useState([]);

	let getNoteTitleInputValue = (value: string) => {
		setNoteTitleInputValue(value);
	}

	let getNoteContentInputValue = (value: string) => {
		setNoteContentInputValue(value);
	}

	let resetContractCallParams = () => {
		setEstimatedGas("");
		setIsSending(false);
		setIsSent(false);
		setTransactionHash("");
		setHasReceipt(false);
		setActualGas("");
		setConfirmations(0);
	}

	let createNote = async () => {
		resetContractCallParams();
		const gas = await estimateGas({
			contract: "Notes",
			method: "createNote",
			args: [noteTitleInputValue, noteContentInputValue],
		})
		setEstimatedGas(gas);
		const response = await txCall({
			contract: "Notes",
			method: "createNote",
			args: [noteTitleInputValue, noteContentInputValue],
			options: {
				from: store.getState().account.address
			},
			onSending: () => {
				setIsSending(true);
			},
			onSent: () => {
				setIsSent(true);
			},
			onTransactionHash: (transactionHash: string) => {
				setTransactionHash(transactionHash);
			},
			onReceipt: (receipt: LooseObject) => {
				setHasReceipt(true);
				setActualGas(receipt.gasUsed);
				Log.info({
					description: "Receipt acquired",
					msg: JSON.stringify(receipt)
				})
			},
			onConfirmation: (confirmation: number) => {
				setConfirmations(confirmation)
				let confirmationBlocks = getConfirmationBlocks();
				if(confirmation < confirmationBlocks) {
					store.dispatch(openInfoToast(`confirmations: ${confirmation}/${confirmationBlocks}`));
				} else if(confirmation === confirmationBlocks) {
					setTimeout(() => {
						store.dispatch(openSuccessToast("note confirmed!"));
					}, getConfirmationDelaySeconds()*1000);
				}
			},
			onError: (error: Error) => {
				Log.error({msg: getErrorMessage(error), description: "error creating note"})
			}
		})
		Log.info({
			description: "Made transaction call",
			msg: JSON.stringify(response)
		})
	}

	let getNotes = async () => {
		const notes = await simpleCall({
			contract: "Notes",
			method: "notesByOwner",
			args: [store.getState().account.address],
			onError: (error: Error) => {
				Log.error({msg: getErrorMessage(error), description: "error getting notes"})
			}
		})
		Log.info({
			description: "Made simple call",
			msg: JSON.stringify(notes)
		})
		setNotes(notes);
	}

  return (
    <div className="notes">
			<div className="notes__content">
				<h1> Notes Contract </h1>
				<TextInput 
					handleChange={getNoteTitleInputValue}
					value={noteTitleInputValue}
					name="note title"
					placeholder="insert note here"
				/>
				<TextInput 
					handleChange={getNoteContentInputValue}
					value={noteContentInputValue}
					name="note content"
					placeholder="insert note here"
				/>
				<ButtonWithKillswitch
					styleClass="btn-background-outline"
					handleClick={createNote}
					name="Create Note"
				/>
				<p>Estimated Gas: {estimatedGas}</p>
				<p>Sending: {String(isSending)}</p>
				<p>Sent: {String(isSent)}</p>
				<p>Tx Hash: {transactionHash}</p>
				<p>Has Receipt: {String(hasReceipt)}</p>
				<p>Actual Gas: {actualGas}</p>
				<p>Confirmations: {confirmations}</p>

				<ButtonWithKillswitch
					styleClass="btn-background-outline"
					handleClick={getNotes}
					name="Get My Notes"
				/>
				{notes.map((note, index) => {
					return (
						<div key={`note-${index}`}>
							<p>Note {index}</p>
							<p>Title: {note[0]}</p>
							<p>Content: {note[1]}</p>
						</div>
					);
				})}
			</div>
    </div>
  );
};
