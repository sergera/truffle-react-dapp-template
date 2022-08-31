import { useState } from "react";

import { ConnectedButtonWithKillswitch as ButtonWithKillswitch } from "../../components/UI/ButtonWithKillswitch";
import { TextInput } from '../../components/UI/TextInput';

import { createNote } from "../../blockchain/tokenTransaction";
import { notesByUser } from "../../blockchain/tokenSimpleCall";
import { estimateGas } from '../../blockchain/contracts';
import { getErrorMessage } from "../../error";
import { Log } from "../../logger";

import { store } from '../../state';
import { openInfoToast, openSuccessToast } from '../../state/toast';
import { openModal } from "../../state/modal";

import { CONTRACTS, CONTRACT_FUNCTIONS } from "../../constants";
import { MODAL_TYPES } from '../../constants';

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

	let create = async () => {
		resetContractCallParams();
		const gas = await estimateGas({
			contract: CONTRACTS.notes,
			method: CONTRACT_FUNCTIONS[CONTRACTS.notes].tx.create,
			args: [noteTitleInputValue, noteContentInputValue],
		})
		setEstimatedGas(gas);

		await createNote({
			title: noteTitleInputValue,
			content: noteContentInputValue,
			owner: store.getState().account.address,
			onSending: () => {
				setIsSending(true);
			},
			onSent: () => {
				setIsSent(true);
			},
			onTxHash: (txHash) => {
				setTransactionHash(transactionHash);
			},
			onReceipt: (receipt) => {
				setHasReceipt(true);
				setActualGas(receipt.gasUsed);
				Log.info({
					description: "Receipt acquired",
					msg: JSON.stringify(receipt)
				})
			},
			onFirstConfirmation: (currentConfirmation, maxConfirmations) => {
				store.dispatch(openInfoToast("transaction mined!"));
				store.dispatch(openInfoToast(`confirmations: ${currentConfirmation}/${maxConfirmations}`));
			},
			onIntermediateConfirmation: (currentConfirmation, maxConfirmations) => {
				store.dispatch(openInfoToast(`confirmations: ${currentConfirmation}/${maxConfirmations}`));
			},
			onFinalConfirmation: (currentConfirmation, maxConfirmations) => {
				store.dispatch(openSuccessToast("note confirmed!"));
			},
			onTxError: (msg) => {
				Log.error({msg: msg, description: "transaction rejected creating note"})
				store.dispatch(openModal(MODAL_TYPES.txRejected));
			},
			onError: (msg) => {
				Log.error({msg: msg, description: "error creating note"})
				store.dispatch(openModal(MODAL_TYPES.contractCallFailed));
			}
		});

		Log.info({
			description: "Made transaction call",
			msg: "Created note in Notes contract!"
		});
	}

	let getNotes = async () => {
		let couldCallContract = true;

		const notes = await notesByUser({
			owner: store.getState().account.address
		}).catch((error) => {
			couldCallContract = false;
			Log.error({msg: getErrorMessage(error), description: "error getting notes"})
			store.dispatch(openModal(MODAL_TYPES.contractCallFailed));			
		});

		if(!couldCallContract) {
			return;
		}

		Log.info({
			description: "Made simple call",
			msg: JSON.stringify(notes)
		});

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
					handleClick={create}
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
