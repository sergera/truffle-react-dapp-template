import { useState } from "react";

import { Input } from "../Input/Input";
import { ValidationRules } from "../ValidationRules";

import { InputWithValidationRulesProps } from './InputWithValidationRules.types';

export function InputWithValidationRules({
	handleChange, 
	value, 
	formId, 
	name, 
	placeholder, 
	isValid,
	rules,
	styleClass=""
}: InputWithValidationRulesProps) {

	let [showRules, setShowRules] = useState(false);

	const decideShowRules = (value: string) => {
		if(isValid) {
			setShowRules(false);
		} else {
			setShowRules(true);
		}
	};
	
  return (
		<>
		<div className="input-with-validation-rules">
			<Input 
				handleChange={handleChange}
				handleBlur={decideShowRules}
				isValid={isValid}
				name={name}
				formId={formId}
				value={value}
				styleClass={"input " + styleClass} 
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
