import { ModalOk } from '../../generic/ModalOk';

import { ModalDisconnectedProps } from './ModalDisconnected.types';

export function ModalDisconnected({close}:ModalDisconnectedProps) {

  return (
		<ModalOk 
			title="Provider Disconnected"
			content="Your provider has disconnected from the blockchain, please try again"
			close={close}
		/>
  );
};
