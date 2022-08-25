import { TextInputProps } from './TextInput.types';

export function TextInput({
	name,
	value,
	handleChange,
	handleFocus=()=>{},
	handleBlur=()=>{},
	isValid=true,
	isRequired=false,
	formId="", 
	placeholder="",
	styleClass=""
}: TextInputProps) {

	const getValueOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		handleChange(value);
	};

	const getValueOnFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		handleFocus(value);
	};

	const getValueOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		handleBlur(value);
	};

	if(!isValid) styleClass = styleClass + " text-input--invalid";

  return (
		<>
		<div className="text-input__wrapper">
			<label className="text-input__label">
				{name}
			</label>
			<input 
				type="text"
				onChange={getValueOnChange}
				onFocus={getValueOnFocus}
				onBlur={getValueOnBlur}
				name={name}
				form={formId}
				value={value}
				className={"text-input " + styleClass} 
				placeholder={placeholder}
			/>
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
