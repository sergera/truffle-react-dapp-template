import { 
	useState 
} from "react";

import { 
	Button 
} from '../../components/UI/Button';
import { 
	Input 
} from '../../components/UI/Input';

import { 
	isName, 
	isLoginId, 
	isEmail, 
	inLengthRange 
} from '../../validation/string';

import { 
	store 
} from '../../state';
import { 
	openErrorNotification 
} from '../../state/errorNotification';
import { 
	openModal 
} from "../../state/modal";

export function Landing() {

	let [nameInputValue, setNameInputValue] = useState("");
	let [userNameInputValue, setUserNameInputValue] = useState("");
	let [emailInputValue, setEmailInputValue] = useState("");

	let [validName, setValidName] = useState(true);
	let [validUserName, setValidUserName] = useState(true);
	let [validEmail, setValidEmail] = useState(true);

	let getNameValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isName(value);
		const valid = lengthOk && formatOk;
		setValidName(valid);
		setNameInputValue(value);
	}

	let getUserNameValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isLoginId(value);
		const valid = lengthOk && formatOk;
		setValidUserName(valid);
		setUserNameInputValue(value);
	}

	let getEmailValue = (value: string) => {
		const lengthOk = inLengthRange(value,8,30);
		const formatOk = isEmail(value);
		const valid = lengthOk && formatOk;
		setValidEmail(valid);
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
		store.dispatch(openModal("DISABLED"));
	}

	const modalNotConnected = () => {
		store.dispatch(openModal("NOT_CONNECTED"));
	}

	const modalDisconnected = () => {
		store.dispatch(openModal("DISCONNECTED"));
	}

	const modalSelectChain = () => {
		store.dispatch(openModal("SELECT_CHAIN"));
	}

	const modalChainNotAdded = () => {
		store.dispatch(openModal("CHAIN_NOT_ADDED"));
	}

	const nothing = () => {};

  return (
    <div className="landing">
				<h1> Error Notification </h1>
				<Button 
					styleClass="btn-background-outline" 
					callback={errorNotification} 
					name={"Error Notification"} 
				/>

				<h1> Input </h1>
				<Input 
					callback={getNameValue}
					value={nameInputValue}
					name="name input"
					placeholder="insert name here"
					valid={validName}
					rules={
						["between 8 and 30 letters",
						"non-consecutive spaces in between"]
					}
				/>
				<Input 
					callback={getUserNameValue}
					value={userNameInputValue}
					name="username input"
					placeholder="insert username here"
					valid={validUserName}
					rules={
						["between 8 and 30 letters and numbers",
						"non-consecutive dots, hifens and underscores in between"]
					}
				/>
				<Input 
					callback={getEmailValue}
					value={emailInputValue}
					name="email input"
					placeholder="insert username here"
					valid={validEmail}
					rules={
						["between 8 and 30 letters and numbers",
						"non-consecutive dots, hifens and underscores in between",
						"complete with '@' and domain"]
					}
				/>

				<h1> Modals </h1>
				<Button 
					styleClass="btn-background-outline" 
					callback={modalDisabled} 
					name={"Modal Disabled"} 
				/>	
				<Button 
					styleClass="btn-background-outline" 
					callback={modalNotConnected} 
					name={"Modal Not Connected"} 
				/>			
				<Button 
					styleClass="btn-background-outline" 
					callback={modalDisconnected} 
					name={"Modal Disconnected"} 
				/>					
				<Button 
					styleClass="btn-background-outline" 
					callback={modalSelectChain} 
					name={"Modal Select Chain"} 
				/>			
				<Button 
					styleClass="btn-background-outline" 
					callback={modalChainNotAdded} 
					name={"Modal Chain Not Added"} 
				/>	
				
				
				<h1> Buttons </h1>
				<Button 
					styleClass="btn-primary-filled" 
					callback={nothing} 
					name={"Button Primary Filled"} 
				/>
				<Button 
					styleClass="btn-primary-outline" 
					callback={nothing} 
					name={"Button Primary Outline"} 
				/>
				<Button 
					styleClass="btn-secondary-filled" 
					callback={nothing} 
					name={"Button Secondary Filled"} 
				/>
				<Button 
					styleClass="btn-secondary-outline" 
					callback={nothing} 
					name={"Button Secondary Outline"} 
				/>
				<Button 
					styleClass="btn-warning-filled" 
					callback={nothing} 
					name={"Button Warning Filled"} 
				/>
				<Button 
					styleClass="btn-warning-outline" 
					callback={nothing} 
					name={"Button Warning Outline"} 
				/>
				<Button 
					styleClass="btn-special-filled" 
					callback={nothing} 
					name={"Button Special Filled"} 
				/>
				<Button 
					styleClass="btn-special-outline" 
					callback={nothing} 
					name={"Button Special Outline"} 
				/>
				<Button 
					styleClass="btn-white-filled" 
					callback={nothing} 
					name={"Button White Filled"} 
				/>
				<Button 
					styleClass="btn-white-outline" 
					callback={nothing} 
					name={"Button White Outline"} 
				/>
				<Button 
					styleClass="btn-black-filled" 
					callback={nothing} 
					name={"Button Black Filled"} 
				/>
				<Button 
					styleClass="btn-black-outline" 
					callback={nothing} 
					name={"Button Black Outline"} 
				/>
				<Button 
					styleClass="btn-background-filled" 
					callback={nothing} 
					name={"Button Background Filled"} 
				/>
				<Button 
					styleClass="btn-background-outline" 
					callback={nothing} 
					name={"Button Background Outline"} 
				/>
				<Button 
					styleClass="btn-foreground-filled" 
					callback={nothing} 
					name={"Button Foreground Filled"} 
				/>
				<Button 
					styleClass="btn-foreground-outline" 
					callback={nothing} 
					name={"Button Foreground Outline"} 
				/>
    </div>
  );
};
