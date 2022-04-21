import { TextInputProps } from './TextInput.types';

export function TextInput({
	name,
	value,
	handleChange, 
	handleBlur=()=>{},
	isValid=true,
	formId="", 
	placeholder="",
	styleClass=""
}: TextInputProps) {

	const getValueOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		handleChange(value);
	};

	const getValueOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		handleBlur(value);
	};

	if(!isValid) styleClass = styleClass + " input--invalid";

  return (
		<>
		<div className="text-input__wrapper">
			<label className="text-input__label">
				{name}
			</label>
			<input 
				type="text"
				onChange={getValueOnChange}
				onBlur={getValueOnBlur}
				name={name}
				form={formId}
				value={value}
				className={"text-input " + styleClass} 
				placeholder={placeholder}
			/>
		</div>
		</>
  );
};
