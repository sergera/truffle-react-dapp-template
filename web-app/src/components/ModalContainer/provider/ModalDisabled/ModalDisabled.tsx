import { Button } from '../../../UI/Button';

import { ModalDisabledProps } from './ModalDisabled.types';

export function ModalDisabled({
	close
}:ModalDisabledProps) {

	const title = "MetaMask Disabled";
	const content1 = "MetaMask is disabled, or has been overwritten by other enabled providers"
	const content2 = "Please make sure to have only MetaMask enabled and try again"
	const content3 = "If you do not have metamask installed, please refer to their website"

  return (
    <div className="modal">
			<div className="modal__content">
				<h1 className="modal__text">{title}</h1>
				<p className="modal__text">{content1}</p>
				<p className="modal__text">{content2}</p>
				<p className="modal__text">{content3}</p>
				<a 
						href={"https://metamask.io/"} 
						target="_self"
						rel="noopener noreferrer"
						className="modal__anchor"
				>
					<p className="modal__anchor--text">
						{"metamask.io"}
					</p>	
				</a>
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
