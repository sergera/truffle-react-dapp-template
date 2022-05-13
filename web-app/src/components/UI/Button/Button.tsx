import { useEffect, useRef } from 'react';

import { ButtonProps } from './Button.types';

export function Button({
	handleClick, 
	name,
	shouldFocusOnRender=false,
	id="",
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
			id={id}
			name={name}
			className={"button " + styleClass}
		>
			{name}
		</button>
  );
};
