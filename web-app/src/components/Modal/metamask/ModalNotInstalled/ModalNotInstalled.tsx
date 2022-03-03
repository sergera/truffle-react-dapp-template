import ModalOk from '../../generic/ModalOk/ModalOk';

interface ModalNotInstalledProps {
	close: Function,
};

function ModalNotInstalled({close}:ModalNotInstalledProps) {

  return (
		<ModalOk 
			title="MetaMask Not Installed"
			content="This application only supports MetaMask, please install MetaMask"
			close={close}
		/>
  );
};

export default ModalNotInstalled;
