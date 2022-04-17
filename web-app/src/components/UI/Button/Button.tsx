import { ButtonProps } from './Button.types';

export function Button({handleClick, name, styleClass=""}: ButtonProps) {

  return (
		<button 
			onClick={handleClick} 
			className={"button " + styleClass} 
			name={name}
		>
			{name}
		</button>
  );
};
