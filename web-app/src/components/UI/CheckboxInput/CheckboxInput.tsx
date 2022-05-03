import { useState, useEffect } from 'react';

import { CheckboxInputProps, CheckboxInputOption } from './CheckboxInput.types';

// TODO: make this into a controlled component

export function CheckboxInput({
	label,
	options,
	handleChange, 
	isRequired=false,
	formId="", 
	styleClass=""
}: CheckboxInputProps) {

	let [checkboxValues, setCheckboxValues] = useState<CheckboxInputOption[]>([]);

	const getValueOnChange = (checked: boolean, option: CheckboxInputOption) => {
		if(checked) {
			setCheckboxValues([...checkboxValues, option]);
		} else {
			/* if user unchecked option, remove it from list */
			setCheckboxValues(checkboxValues.filter(
				(checkedOption) => checkedOption.label !== option.label
			));
		}
	};

	useEffect(() => {
		handleChange(checkboxValues);
	}, [handleChange, checkboxValues]);

  return (
		<>
		<div className="checkbox-input__wrapper">
			<label className="checkbox-input__label">
				{label}
			</label>
				{options.map((option) => {
					// if(option.checkedByDefault) getValueOnChange(true, option);
					return (
						<label 
							className="checkbox-input-option__label"
							key={option.label}
						>
							<input 
								type="checkbox"
								onChange={(e) => getValueOnChange(e.target.checked, option)}
								name={label}
								form={formId}
								className={"checkbox-input " + styleClass} 
							/>
							{option.label}
						</label>
					);
				})}
			{isRequired && 
				<small
					className="text-input__required"
				>
					*required
				</small>
			}
		</div>
		</>
  );
};
