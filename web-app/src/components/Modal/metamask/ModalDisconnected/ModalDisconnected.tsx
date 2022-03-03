import ModalOk from '../../generic/ModalOk/ModalOk';

interface ModalDisconnectedProps {
	close: Function,
};

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
