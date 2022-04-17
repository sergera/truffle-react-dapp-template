import { Button } from '../../../UI/Button';

import { ModalChainNotAddedProps } from './ModalChainNotAdded.types';

export function ModalChainNotAdded({
	close
}:ModalChainNotAddedProps) {

	const title = "Chain Not Added";
	const content = "The selected chain is not added to your wallet provider, please add the chain";

	const closeModal = () => {
		close();
	};

  return (
		<div className="modal">
			<div className="modal__content">
				<h1 className="modal__text">{title}</h1>
				<p className="modal__text">{content}</p>
			</div>
			<Button 
				styleClass="btn-foreground-outline" 
				name={"ok"} 
				handleClick={closeModal}
			/>
		</div>
  );
};
