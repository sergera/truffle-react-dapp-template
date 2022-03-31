import { InputProps } from './Input.types';

export function Input({callback, value, formId, name, placeholder, styleClass=""}: InputProps) {

	const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		callback(value);
	};

  return (
		<>
		<label className="input__label">
			{name}
		</label>
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
		</>
  );
};
