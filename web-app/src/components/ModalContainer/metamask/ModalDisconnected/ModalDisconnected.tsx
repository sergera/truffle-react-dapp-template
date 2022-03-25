import ModalOk from '../../generic/ModalOk/ModalOk';

import { ModalDisconnectedProps } from './ModalDisconnected.types';

function ModalDisconnected({close}:ModalDisconnectedProps) {

  return (
		<ModalOk 
			title="Provider Disconnected"
			content="Your provider has disconnected from the blockchain, please try again"
			close={close}
		/>
  );
};

export default ModalDisconnected;
