interface ButtonProps {
	callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
	name: string;
	styleClass?: string;
}

function Button({callback, name, styleClass=""}: ButtonProps) {

  return (
		<button 
			onClick={callback} 
			className={"button " + styleClass} 
		>
		{name}
		</button>
  );
}

export default Button;
