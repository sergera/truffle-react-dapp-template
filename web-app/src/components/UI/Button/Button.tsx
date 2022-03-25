import { ButtonProps } from './Button.types';

function Button({callback, name, styleClass=""}: ButtonProps) {

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

export default Button;
