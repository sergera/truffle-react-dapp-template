import { ModalOk } from '../../generic/ModalOk';

import { ModalDisabledProps } from './ModalDisabled.types';

export function ModalDisabled({close}:ModalDisabledProps) {

  return (
		<ModalOk 
			title="MetaMask Disabled"
			content={`MetaMask not enabled, or has been overwritten by other enabled providers.
								Please make sure to have only MetaMask enabled and try again.`}
			close={close}
		/>
  );
};
