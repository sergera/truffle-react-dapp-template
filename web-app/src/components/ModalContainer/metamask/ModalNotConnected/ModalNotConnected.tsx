import { ModalOk } from '../../generic/ModalOk';

import { ModalNotConnectedProps } from './ModalNotConnected.types';

export function ModalNotConnected({close}:ModalNotConnectedProps) {

  return (
		<ModalOk 
			title="Not Connected"
			content="Your provider is not connected to the blockchain, please check your connection and try again"
			close={close}
		/>
  );
};
