import { InputProps } from './Input.types';

export function Input({
	name,
	value,
	handleChange, 
	handleBlur=()=>{},
	isValid=true,
	formId="", 
	placeholder="",
	styleClass=""
}: InputProps) {

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
		<div className="input__wrapper">
			<label className="input__label">
				{name}
			</label>
			<input 
				type="text"
				onChange={getValueOnChange}
				onBlur={getValueOnBlur}
				name={name}
				form={formId}
				value={value}
				className={"input " + styleClass} 
				placeholder={placeholder}
			/>
		</div>
		</>
  );
};
