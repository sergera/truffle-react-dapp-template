import { ButtonProps } from './Button.types';

export function Button({callback, name, styleClass=""}: ButtonProps) {

  return (
		<button 
			onClick={callback} 
			className={"button " + styleClass} 
			role={"button"}
			name={name}
		>
		{name}
		</button>
  );
};
