import { RadioInputProps, RadioInputOption } from './RadioInput.types';

// TODO: make this into a controlled component

export function RadioInput({
	label,
	options,
	handleChange, 
	formId="", 
	styleClass=""
}: RadioInputProps) {

	const getValueOnChange = (option: RadioInputOption) => {
		handleChange(option);
	}

  return (
		<div className="radio-input__wrapper">
			<label className="radio-input__label">
				{label}
			</label>
				{options.map((option) => {
					return (
						<label 
							className="radio-input-option__label"
							key={option.label}
						>
							<input 
								type="radio"
								onChange={() => getValueOnChange(option)}
								name={label}
								form={formId}
								className={"radio-input " + styleClass} 
							/>
							{option.label}
						</label>
					);
				})}
		</div>
  );
};
