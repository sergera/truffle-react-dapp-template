import { Button } from '../../../UI/Button';

import { ModalDisconnectedProps } from './ModalDisconnected.types';

export function ModalDisconnected({
	close
}:ModalDisconnectedProps) {

	const title = "Provider Disconnected";
	const content = "Your provider has disconnected from the blockchain, please try again";

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
