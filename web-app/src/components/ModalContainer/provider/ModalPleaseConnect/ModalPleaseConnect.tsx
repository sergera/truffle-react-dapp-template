import { Button } from '../../../UI/Button';

import { ModalPleaseConnectProps } from './ModalPleaseConnect.types';

export function ModalPleaseConnect({
	close
}:ModalPleaseConnectProps) {

	const title = "Please Connect";
	const content = "Please connect MetaMask before using this functionality";

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
			/>
		</div>
  );
};
