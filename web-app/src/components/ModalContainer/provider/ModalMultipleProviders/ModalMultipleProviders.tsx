import { 
	Button 
} from '../../../UI/Button';

import { 
	ModalMultipleProvidersProps 
} from './ModalMultipleProviders.types';

export function ModalMultipleProviders({
	close
}:ModalMultipleProvidersProps) {

	const title = "Multiple Providers";
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
				callback={closeModal}
			/>
		</div>
  );
};
