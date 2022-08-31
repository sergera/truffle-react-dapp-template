import { Button } from '../../../UI/Button';

import { ModalContractCallFailedProps } from './ModalContractCallFailed.types';

export function ModalContractCallFailed({
	close
}:ModalContractCallFailedProps) {

	const title = "Contract Call Failed";
	const content = "Failed to call contract, please try again later";

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
