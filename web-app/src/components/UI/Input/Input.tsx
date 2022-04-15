import { 
	useState 
} from "react";

import { 
	ValidationRules 
} from "../ValidationRules";

import { 
	InputProps 
} from './Input.types';

export function Input({
	callback, 
	value, 
	formId, 
	name, 
	placeholder, 
	isValid,
	rules,
	styleClass=""
}: InputProps) {

	let [showRules, setShowRules] = useState(false);

	const decideShowRules = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(isValid) {
			setShowRules(false);
		} else {
			setShowRules(true);
		}
	};

	const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		callback(value);
	};

	if(!isValid) styleClass = styleClass + " input--invalid";

  return (
		<>
		<div className="input__wrapper">
			<label className="input__label">
				{name}
			</label>
			<input 
				type="text"
				onChange={getValue}
				onBlur={decideShowRules}
				role={"input"}
				name={name}
				form={formId}
				value={value}
				className={"input " + styleClass} 
				placeholder={placeholder}
			/>
			<ValidationRules
				show={showRules}
				rules={rules}
			/>
		</div>
		</>
  );
};
