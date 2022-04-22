import { useState } from "react";

import { TextInput } from "../TextInput/TextInput";
import { ValidationRules } from "../ValidationRules";

import { TextInputWithRulesProps } from './TextInputWithRules.types';

export function TextInputWithRules({
	handleChange, 
	value, 
	formId, 
	name, 
	placeholder, 
	isValid,
	rules,
	styleClass=""
}: TextInputWithRulesProps) {

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
		<div className="text-input-with-rules">
			<TextInput 
				handleChange={handleChange}
				handleBlur={decideShowRules}
				isValid={isValid}
				name={name}
				formId={formId}
				value={value}
				styleClass={"text-input " + styleClass} 
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