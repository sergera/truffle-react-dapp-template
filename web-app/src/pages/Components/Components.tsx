import { useState } from "react";

import { Button } from '../../components/UI/Button';
import { ConnectedButtonWithKillswitch as ButtonWithKillswitch } from "../../components/UI/ButtonWithKillswitch";
import { TextInput } from '../../components/UI/TextInput';
import { TextInputWithRules } from '../../components/UI/TextInputWithRules';
import { RadioInput, RadioInputOption, emptyRadioInputOption } from "../../components/UI/RadioInput";
import { CheckboxInput, CheckboxInputOption } from "../../components/UI/CheckboxInput";
import { Select, SelectOption } from "../../components/UI/Select";

import { isName, isLoginId, isEmail, inLengthRange, isEther, isWei } from '../../validation/string';
import { ethToWei, weiToEth } from '../../format/eth/unit';

import { store } from '../../state';
import { openSuccessNotification, openInfoNotification, openWarningNotification, openErrorNotification } from '../../state/notification';
import { openSuccessToast, openInfoToast, openWarningToast, openErrorToast } from '../../state/toast';
import { openModal } from "../../state/modal";

import { MODAL_TYPES } from '../../constants';

const SELECT_OPTIONS = {
	one: {label: "value 1", data: {one: "1"}},
	two: {label: "value 2", data: {two: "2"}},
	three: {label: "value 3", data: {three: "3"}},
};

export function Components() {

	let [simpleInputValue, setSimpleInputValue] = useState("");
	let [nameInputValue, setNameInputValue] = useState("");
	let [userNameInputValue, setUserNameInputValue] = useState("");
	let [emailInputValue, setEmailInputValue] = useState("");
	let [etherInputValue, setEtherInputValue] = useState("0");
	let [weiInputValue, setWeiInputValue] = useState("0");
	let [radioInputOption, setRadioInputOption] = useState<RadioInputOption>(emptyRadioInputOption());
	let [checkboxInputOptions, setCheckboxInputOptions] = useState({});
	let [selectOption, setSelectOption] = useState<SelectOption>(SELECT_OPTIONS.one);

	let [isValidName, setIsValidName] = useState(true);
	let [isValidUserName, setIsValidUserName] = useState(true);
	let [isValidEmail, setIsValidEmail] = useState(true);
	let [isValidEther, setIsValidEther] = useState(true);
	let [isValidWei, setIsValidWei] = useState(true);

	let getSimpleInputValue = (value: string) => {
		setSimpleInputValue(value);
	};

	let getNameValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isName(value);
		const isValid = lengthOk && formatOk;
		setIsValidName(isValid);
		setNameInputValue(value);
	};

	let getUserNameValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isLoginId(value);
		const isValid = lengthOk && formatOk;
		setIsValidUserName(isValid);
		setUserNameInputValue(value);
	};

	let getEmailValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isEmail(value);
		const isValid = lengthOk && formatOk;
		setIsValidEmail(isValid);
		setEmailInputValue(value);
	};

	let getEtherValue = (value: string) => {
		setIsValidEther(isEther(value));
		setEtherInputValue(value.replace(",","."));
	};

	let getWeiValue = (value: string) => {
		setIsValidWei(isWei(value));
		setWeiInputValue(value);
	};

	let getRadioInputOption = (option: RadioInputOption) => {
		setRadioInputOption(option);
	};

	let getCheckboxInputOptions = (options: CheckboxInputOption[]) => {
		setCheckboxInputOptions(options);
	};

	let getSelectOption = (option: SelectOption) => {
		setSelectOption(option);
	};

	const successNotification = () => {
		store.dispatch(openSuccessNotification(
			`Success Notification this is a really long success 
			notification that is used in case something goes 
			amazingly right which it normally does in most cases`
		));
	};

	const infoNotification = () => {
		store.dispatch(openInfoNotification(
			`Info Notification this is a really long info 
			notification that is used in case something happens 
			that the user must know by reading text which is a rare occasion`
		));
	};

	const warningNotification = () => {
		store.dispatch(openWarningNotification(
			`Warning Notification this is a really long warning 
			notification that is used in case something goes 
			a little wrong which it normally does in most cases`
		));
	};

	const errorNotification = () => {
		store.dispatch(openErrorNotification(
			`Error Notification this is a really long error 
			notification that is used in case something goes 
			terribly wrong which it normally does in most cases`
		));
	};

	const successToast = () => {
		store.dispatch(openSuccessToast());
	};

	const infoToast = () => {
		store.dispatch(openInfoToast("Check out this info!"));
	};

	const warningToast = () => {
		store.dispatch(openWarningToast("Check out this warning!"));
	};	

	const errorToast = () => {
		store.dispatch(openErrorToast());
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

	const modalIncompleteForm = () => {
		store.dispatch(openModal(MODAL_TYPES.incompleteForm));
	}

	const modalContractCallFailed = () => {
		store.dispatch(openModal(MODAL_TYPES.contractCallFailed));
	}

	const modalTxRejected = () => {
		store.dispatch(openModal(MODAL_TYPES.txRejected));
	}

	const nothing = () => {};

  return (
    <div className="components">
			<div className="components__content">
				<h1> Select </h1>
				<Select
					label="select"
					handleChange={getSelectOption}
					selected={selectOption}
					options={[
						SELECT_OPTIONS.one,
						SELECT_OPTIONS.two,
						SELECT_OPTIONS.three,
					]}
				/>
				<p>Selected option: {JSON.stringify(selectOption)}</p>

				<h1> Text Input </h1>
				<TextInput
					handleChange={getSimpleInputValue}
					value={simpleInputValue}
					name="simple input"
					placeholder="insert text here"
				/>

				<h1> Text Input With Rules </h1>
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
						["max 59 whole digits starting with a non-zero number",
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
						["max 77 whole digits",
						"no leading zeros"]
					}
				/>
				<p>Amount in eth: {isValidWei && weiToEth(weiInputValue)}</p>

				<h1> Radio Input </h1>
				<RadioInput
					label="radio input"
					handleChange={getRadioInputOption}
					value={radioInputOption}
					options={[
						{label: "value 1", data: {one: "1"}},
						{label: "value 2", data: {two: "2"}},
						{label: "value 3", data: {three: "3"}},
					]}
				/>
				<p>Selected option: {JSON.stringify(radioInputOption)}</p>

				<h1> Checkbox Input </h1>
				<CheckboxInput
					label="checkbox input"
					handleChange={getCheckboxInputOptions}
					options={[
						{label: "value 1", data: {one: "1"}},
						{label: "value 2", data: {two: "2"}},
						{label: "value 3", data: {three: "3"}},
					]}
				/>
				<p>Selected options: {JSON.stringify(checkboxInputOptions)}</p>

				<h1> Notifications </h1>
				<Button
					styleClass="btn-background-outline"
					handleClick={successNotification}
					name={"Success Notification"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={infoNotification}
					name={"Info Notification"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={warningNotification}
					name={"Warning Notification"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={errorNotification}
					name={"Error Notification"}
				/>

				<h1>Toasts</h1>
				<Button
					styleClass="btn-background-outline"
					handleClick={successToast}
					name={"Success Toast"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={infoToast}
					name={"Info Toast"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={warningToast}
					name={"Warning Toast"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={errorToast}
					name={"Error Toast"}
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
				<Button
					styleClass="btn-background-outline"
					handleClick={modalIncompleteForm}
					name={"Modal Incomplete Form"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={modalContractCallFailed}
					name={"Modal Contract Call Failed"}
				/>
				<Button
					styleClass="btn-background-outline"
					handleClick={modalTxRejected}
					name={"Modal Transaction Rejected"}
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
    </div>
  );
};
