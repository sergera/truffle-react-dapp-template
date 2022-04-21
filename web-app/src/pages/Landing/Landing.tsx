import { useState } from "react";

import { Button } from '../../components/UI/Button';
import { ConnectedButtonWithKillswitch as ButtonWithKillswitch } from "../../components/UI/ButtonWithKillswitch";
import { Input } from '../../components/UI/Input';
import { InputWithValidationRules } from '../../components/UI/InputWithValidationRules';

import { simpleCall, txCall, estimateGas } from '../../blockchain/contracts';
import { isName, isLoginId, isEmail, inLengthRange } from '../../validation/string';
import { getErrorMessage } from "../../error";
import { Log } from "../../logger";

import { store } from '../../state';
import { openErrorNotification } from '../../state/errorNotification';
import { openModal } from "../../state/modal";
import { LooseObject } from "../../types";

import { MODAL_TYPES } from '../../state/modal';

export function Landing() {

	/* contract interaction */
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

	/* components */
	let [simpleInputValue, setSimpleInputValue] = useState("");
	let [nameInputValue, setNameInputValue] = useState("");
	let [userNameInputValue, setUserNameInputValue] = useState("");
	let [emailInputValue, setEmailInputValue] = useState("");

	let [isValidName, setIsValidName] = useState(true);
	let [isValidUserName, setIsValidUserName] = useState(true);
	let [isValidEmail, setIsValidEmail] = useState(true);

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
					description: "Receipt Acquired",
					msg: JSON.stringify(receipt)
				})
			},
			onConfirmation: (confirmation: number) => {
				setConfirmations(confirmation)
			},
			onError: (error: Error) => {
				store.dispatch(openErrorNotification(getErrorMessage(error)));
			}
		})
		Log.info({
			description: "Made Transaction Call",
			msg: JSON.stringify(response)
		})
	}

	let getNotes = async () => {
		const notes = await simpleCall({
			contract: "Notes",
			method: "notesByOwner",
			args: [store.getState().account.address],
			onError: (error: Error) => {
				store.dispatch(openErrorNotification(getErrorMessage(error)));
			}
		})
		Log.info({
			description: "Made Simple Call",
			msg: JSON.stringify(notes)
		})
		setNotes(notes);
	}

	let getSimpleInputValue = (value: string) => {
		setSimpleInputValue(value);
	}

	let getNameValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isName(value);
		const isValid = lengthOk && formatOk;
		setIsValidName(isValid);
		setNameInputValue(value);
	}

	let getUserNameValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isLoginId(value);
		const isValid = lengthOk && formatOk;
		setIsValidUserName(isValid);
		setUserNameInputValue(value);
	}

	let getEmailValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isEmail(value);
		const isValid = lengthOk && formatOk;
		setIsValidEmail(isValid);
		setEmailInputValue(value);
	}

	const errorNotification = () => {
		store.dispatch(openErrorNotification(
			`Error Notification this is a really long error 
			notification that is used in case something goes 
			terribly wrong which it normally does in most cases`
		));
	};

	const modalDisabled = () => {
		store.dispatch(openModal(MODAL_TYPES.disabled));
	}

	const modalNotConnected = () => {
		store.dispatch(openModal(MODAL_TYPES.notConnected));
	}

	const modalDisconnected = () => {
		store.dispatch(openModal(MODAL_TYPES.disconnected));
	}

	const modalSelectChain = () => {
		store.dispatch(openModal(MODAL_TYPES.selectChain));
	}

	const modalChainNotAdded = () => {
		store.dispatch(openModal(MODAL_TYPES.chainNotAdded));
	}

	const modalPleaseConnect = () => {
		store.dispatch(openModal(MODAL_TYPES.pleaseConnect));
	}

	const nothing = () => {};

  return (
    <div className="landing">
				<h1> Test Contract </h1>
				<Input 
					handleChange={getNoteTitleInputValue}
					value={noteTitleInputValue}
					name="note title"
					placeholder="insert note here"
				/>
				<Input 
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

				<h1> Error Notification </h1>
				<Button 
					styleClass="btn-background-outline" 
					handleClick={errorNotification} 
					name={"Error Notification"} 
				/>

				<h1> Input </h1>
				<Input 
					handleChange={getSimpleInputValue}
					value={simpleInputValue}
					name="simple input"
					placeholder="insert text here"
				/>

				<h1> Input With Validation Rules </h1>
				<InputWithValidationRules 
					handleChange={getNameValue}
					value={nameInputValue}
					name="name input"
					placeholder="insert name here"
					isValid={isValidName}
					rules={
						["between 8 and 30 letters",
						"non-consecutive spaces in between"]
					}
				/>
				<InputWithValidationRules 
					handleChange={getUserNameValue}
					value={userNameInputValue}
					name="username input"
					placeholder="insert username here"
					isValid={isValidUserName}
					rules={
						["between 8 and 30 letters and numbers",
						"non-consecutive dots, hifens and underscores in between"]
					}
				/>
				<InputWithValidationRules 
					handleChange={getEmailValue}
					value={emailInputValue}
					name="email input"
					placeholder="insert username here"
					isValid={isValidEmail}
					rules={
						["between 8 and 30 letters and numbers",
						"non-consecutive dots, hifens and underscores in between",
						"complete with '@' and domain"]
					}
				/>

				<h1> Modals </h1>
				<Button 
					styleClass="btn-background-outline" 
					handleClick={modalDisabled} 
					name={"Modal Disabled"} 
				/>	
				<Button 
					styleClass="btn-background-outline" 
					handleClick={modalNotConnected} 
					name={"Modal Not Connected"} 
				/>			
				<Button 
					styleClass="btn-background-outline" 
					handleClick={modalDisconnected} 
					name={"Modal Disconnected"} 
				/>					
				<Button 
					styleClass="btn-background-outline" 
					handleClick={modalSelectChain} 
					name={"Modal Select Chain"} 
				/>			
				<Button 
					styleClass="btn-background-outline" 
					handleClick={modalChainNotAdded} 
					name={"Modal Chain Not Added"} 
				/>	
				<Button 
					styleClass="btn-background-outline" 
					handleClick={modalPleaseConnect} 
					name={"Modal Please Connect"} 
				/>	
				
				<h1> Button With Killswitch</h1>
				<ButtonWithKillswitch 
					styleClass="btn-background-outline" 
					handleClick={errorNotification} 
					name={"Error Notification"} 
				/>			
				
				<h1> Buttons </h1>
				<Button 
					styleClass="btn-primary-filled" 
					handleClick={nothing} 
					name={"Button Primary Filled"} 
				/>
				<Button 
					styleClass="btn-primary-outline" 
					handleClick={nothing} 
					name={"Button Primary Outline"} 
				/>
				<Button 
					styleClass="btn-secondary-filled" 
					handleClick={nothing} 
					name={"Button Secondary Filled"} 
				/>
				<Button 
					styleClass="btn-secondary-outline" 
					handleClick={nothing} 
					name={"Button Secondary Outline"} 
				/>
				<Button 
					styleClass="btn-warning-filled" 
					handleClick={nothing} 
					name={"Button Warning Filled"} 
				/>
				<Button 
					styleClass="btn-warning-outline" 
					handleClick={nothing} 
					name={"Button Warning Outline"} 
				/>
				<Button 
					styleClass="btn-special-filled" 
					handleClick={nothing} 
					name={"Button Special Filled"} 
				/>
				<Button 
					styleClass="btn-special-outline" 
					handleClick={nothing} 
					name={"Button Special Outline"} 
				/>
				<Button 
					styleClass="btn-white-filled" 
					handleClick={nothing} 
					name={"Button White Filled"} 
				/>
				<Button 
					styleClass="btn-white-outline" 
					handleClick={nothing} 
					name={"Button White Outline"} 
				/>
				<Button 
					styleClass="btn-black-filled" 
					handleClick={nothing} 
					name={"Button Black Filled"} 
				/>
				<Button 
					styleClass="btn-black-outline" 
					handleClick={nothing} 
					name={"Button Black Outline"} 
				/>
				<Button 
					styleClass="btn-background-filled" 
					handleClick={nothing} 
					name={"Button Background Filled"} 
				/>
				<Button 
					styleClass="btn-background-outline" 
					handleClick={nothing} 
					name={"Button Background Outline"} 
				/>
				<Button 
					styleClass="btn-foreground-filled" 
					handleClick={nothing} 
					name={"Button Foreground Filled"} 
				/>
				<Button 
					styleClass="btn-foreground-outline" 
					handleClick={nothing} 
					name={"Button Foreground Outline"} 
				/>
    </div>
  );
};
