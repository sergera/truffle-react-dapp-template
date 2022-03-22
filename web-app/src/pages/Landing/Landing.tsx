import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import store from '../../state/store';
import { openErrorNotification } from '../../state/errorNotification/errorNotificationSlice';
import { openModal } from "../../state/modal/modalSlice";

import { useState } from "react";

function Landing() {

	let [inputValue, setInputValue] = useState("");

	let getValue = (value: string) => {
		setInputValue(value);
	}

	const errorNotification = () => {
		store.dispatch(openErrorNotification(
			`Error Notification this is a really long error 
			notification that is used in case something goes 
			terribly wrong which it normally does in most cases`
		));
	};

	const modalSelectChain = () => {
		store.dispatch(openModal("SELECT_CHAIN"));
	}

	const modalNotInstalled = () => {
		store.dispatch(openModal("NOT_INSTALLED"));
	}

	const modalNotConnected = () => {
		store.dispatch(openModal("NOT_CONNECTED"));
	}

	const modalDisconnected = () => {
		store.dispatch(openModal("DISCONNECTED"));
	}

	const modalMultipleProviders = () => {
		store.dispatch(openModal("MULTIPLE_PROVIDERS"));
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
				<br/>
				<br/>
				<h1> Input </h1>
				<Input 
					callback={getValue}
					value={inputValue}
					name={"input"}
				/>
				<br/>
				<br/>
				<h1> Modals </h1>
				<Button 
					styleClass="btn-background-outline" 
					callback={modalSelectChain} 
					name={"Modal Select Chain"} 
				/>			
				<br/>
				<br/>
				<Button 
					styleClass="btn-background-outline" 
					callback={modalNotInstalled} 
					name={"Modal Not Installed"} 
				/>	
				<br/>
				<br/>
				<Button 
					styleClass="btn-background-outline" 
					callback={modalNotConnected} 
					name={"Modal Not Connected"} 
				/>			
				<br/>
				<br/>
				<Button 
					styleClass="btn-background-outline" 
					callback={modalDisconnected} 
					name={"Modal Disconnected"} 
				/>	
				<br/>
				<br/>
				<Button 
					styleClass="btn-background-outline" 
					callback={modalMultipleProviders} 
					name={"Modal Multiple Providers"} 
				/>	
				<br/>
				<br/>
				<h1> Buttons </h1>
				<Button 
					styleClass="btn-primary-filled" 
					callback={nothing} 
					name={"Button Primary Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-primary-outline" 
					callback={nothing} 
					name={"Button Primary Outline"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-secondary-filled" 
					callback={nothing} 
					name={"Button Secondary Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-secondary-outline" 
					callback={nothing} 
					name={"Button Secondary Outline"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-warning-filled" 
					callback={nothing} 
					name={"Button Warning Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-warning-outline" 
					callback={nothing} 
					name={"Button Warning Outline"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-special-filled" 
					callback={nothing} 
					name={"Button Special Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-special-outline" 
					callback={nothing} 
					name={"Button Special Outline"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-white-filled" 
					callback={nothing} 
					name={"Button White Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-white-outline" 
					callback={nothing} 
					name={"Button White Outline"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-black-filled" 
					callback={nothing} 
					name={"Button Black Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-black-outline" 
					callback={nothing} 
					name={"Button Black Outline"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-background-filled" 
					callback={nothing} 
					name={"Button Background Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-background-outline" 
					callback={nothing} 
					name={"Button Background Outline"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-foreground-filled" 
					callback={nothing} 
					name={"Button Foreground Filled"} 
				/>
				<br/>
				<br/>
				<Button 
					styleClass="btn-foreground-outline" 
					callback={nothing} 
					name={"Button Foreground Outline"} 
				/>
				<br/>
				<br/>
    </div>
  );
}

export default Landing;
