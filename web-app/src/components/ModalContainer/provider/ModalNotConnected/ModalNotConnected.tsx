import { 
	Button 
} from '../../../UI/Button';

import { 
	ModalNotConnectedProps 
} from './ModalNotConnected.types';

export function ModalNotConnected({
	close
}:ModalNotConnectedProps) {

	const title = "Not Connected";
	const content = "Your provider is not connected to the blockchain, please try again";

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
				callback={closeModal}
			/>
		</div>
  );
};
