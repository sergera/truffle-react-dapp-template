import { useEffect, useRef } from 'react';

import { ButtonProps } from './Button.types';

export function Button({
	handleClick, 
	name, 
	shouldFocusOnRender=false, 
	styleClass="",
}: ButtonProps) {

	useEffect(() => {
		if(shouldFocusOnRender) {
			if(buttonRef.current) {
				buttonRef.current.focus();
			}
		}
	}, [shouldFocusOnRender]);

	const buttonRef = useRef() as React.RefObject<HTMLButtonElement>;

  return (
		<button 
			ref={buttonRef}
			onClick={handleClick} 
			className={"button " + styleClass} 
			name={name}
		>
			{name}
		</button>
  );
};
