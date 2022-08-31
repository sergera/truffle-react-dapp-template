import { Button } from '../../../UI/Button';

import { ModalTxRejectedProps } from './ModalTxRejected.types';

export function ModalTxRejected({
	close
}:ModalTxRejectedProps) {

	const title = "Transaction Rejected";
	const content = "The transaction was rejected by the blockchain, please try again later";

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
