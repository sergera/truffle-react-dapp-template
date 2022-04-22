import { useState } from "react";

import { Button } from '../../components/UI/Button';
import { ConnectedButtonWithKillswitch as ButtonWithKillswitch } from "../../components/UI/ButtonWithKillswitch";
import { TextInput } from '../../components/UI/TextInput';
import { TextInputWithRules } from '../../components/UI/TextInputWithRules';

import { isName, isLoginId, isEmail, inLengthRange, isEther, isWei } from '../../validation/string';
import { ethToWei, weiToEth } from '../../format/eth/unit';

import { store } from '../../state';
import { openErrorNotification } from '../../state/errorNotification';
import { openModal } from "../../state/modal";

import { MODAL_TYPES } from '../../state/modal';

export function Components() {

	/* components */
	let [simpleInputValue, setSimpleInputValue] = useState("");
	let [nameInputValue, setNameInputValue] = useState("");
	let [userNameInputValue, setUserNameInputValue] = useState("");
	let [emailInputValue, setEmailInputValue] = useState("");
	let [etherInputValue, setEtherInputValue] = useState("0");
	let [weiInputValue, setWeiInputValue] = useState("0");

	let [isValidName, setIsValidName] = useState(true);
	let [isValidUserName, setIsValidUserName] = useState(true);
	let [isValidEmail, setIsValidEmail] = useState(true);
	let [isValidEther, setIsValidEther] = useState(true);
	let [isValidWei, setIsValidWei] = useState(true);

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

	let getEtherValue = (value: string) => {
		setIsValidEther(isEther(value));
		setEtherInputValue(value.replace(",","."));
	}

	let getWeiValue = (value: string) => {
		setIsValidWei(isWei(value));
		setWeiInputValue(value);
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
    <div className="components">
				<h1> Error Notification </h1>
				<Button 
					styleClass="btn-background-outline" 
					handleClick={errorNotification} 
					name={"Error Notification"} 
				/>

				<h1> Input </h1>
				<TextInput 
					handleChange={getSimpleInputValue}
					value={simpleInputValue}
					name="simple input"
					placeholder="insert text here"
				/>

				<h1> Input With Validation Rules </h1>
				<TextInputWithRules 
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
				<TextInputWithRules 
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
				<TextInputWithRules 
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
				<TextInputWithRules 
					handleChange={getEtherValue}
					value={etherInputValue}
					name="ether input"
					placeholder="insert ether amount here"
					isValid={isValidEther}
					rules={
						["max 78 whole digits starting with a non-zero number",
						"one . or , as decimal separator",
						"max 18 decimal digits ending with a non-zero number"]
					}
				/>
				<p>Amount in wei: {isValidEther && ethToWei(etherInputValue)}</p>

				<TextInputWithRules 
					handleChange={getWeiValue}
					value={weiInputValue}
					name="wei input"
					placeholder="insert wei amount here"
					isValid={isValidWei}
					rules={
						["max 78 whole digits",
						"no leading zeros"]
					}
				/>
				<p>Amount in eth: {isValidWei && weiToEth(weiInputValue)}</p>


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
