import { useState, useEffect } from "react";

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
	handleBlur=()=>{},
	isRequired=false,
	styleClass=""
}: TextInputWithRulesProps) {

	let [showRules, setShowRules] = useState(false);

	useEffect(() => {
		if(isValid) {
			setShowRules(false);
		} else {
			setShowRules(true);
		}
	}, [isValid]);
	
  return (
		<>
		<div className="text-input-with-rules">
			<TextInput 
				handleChange={handleChange}
				handleBlur={handleBlur}
				isValid={isValid}
				name={name}
				formId={formId}
				value={value}
				styleClass={"text-input " + styleClass} 
				placeholder={placeholder}
				isRequired={isRequired}
			/>
			<ValidationRules
				show={showRules}
				rules={rules}
			/>
		</div>
		</>
  );
};
