import ModalOk from '../../generic/ModalOk/ModalOk';

import { ModalNotConnectedProps } from './ModalNotConnected.types';

function ModalNotConnected({close}:ModalNotConnectedProps) {

  return (
		<ModalOk 
			title="Not Connected"
			content="Your provider is not connected to the blockchain, please check your connection and try again"
			close={close}
		/>
  );
};

export default ModalNotConnected;
