import { RadioInputProps, RadioInputOption } from './RadioInput.types';

export function emptyRadioInputOption():RadioInputOption {
	return {
		label: "",
		data: {},
	};
};

export function RadioInput({
	label,
	options,
	value,
	handleChange,
	isRequired=false,
	formId="", 
	styleClass=""
}: RadioInputProps) {
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
								onChange={() => handleChange(option)}
								name={label}
								checked={value.label === option.label}
								form={formId}
								className={"radio-input " + styleClass} 
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
  );
};
