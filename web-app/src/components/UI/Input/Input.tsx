interface InputProps {
	callback: Function;
	value: string;
	name: string;
	formId?: string;
	placeholder?: string;
	styleClass?: string;
};

function Input({callback, value, formId, name, placeholder, styleClass=""}: InputProps) {

	const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		callback(value);
	};

  return (
		<label>
			{name}
			<input 
				type="text"
				onChange={getValue} 
				role={"input"}
				name={name}
				form={formId}
				value={value}
				className={"input " + styleClass} 
				placeholder={placeholder}
			/>
		</label>
  );
};

export default Input;
