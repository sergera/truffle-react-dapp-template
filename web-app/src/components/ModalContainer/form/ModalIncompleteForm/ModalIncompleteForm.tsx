import { Button } from '../../../UI/Button';

import { ModalIncompleteFormProps } from './ModalIncompleteForm.types';

export function ModalIncompleteForm({
	close
}:ModalIncompleteFormProps) {

	const title = "Incomplete Fields";
	const content = "Please fill all required fields correctly before submitting";

  return (
		<div className="modal">
			<div className="modal__content">
				<h1 className="modal__text">{title}</h1>
				<p className="modal__text">{content}</p>
			</div>
			<Button 
				styleClass="btn-foreground-outline" 
				name={"ok"} 
				handleClick={() => close()}
				shouldFocusOnRender={true}
			/>
		</div>
  );
};
